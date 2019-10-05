import * as fs from 'fs';
import { KojifilesChanged, OutboundMessage } from '../../model/OutboundMessage';

function readDir(directory: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, paths) => {
      if (err) {
        reject(err);
      } else {
        const filteredPaths = paths
          .filter(path => !path.includes('node_modules') && !path.includes('.git') && !path.includes('.remy'))
          .map(path => `${directory}/${path}`);
        resolve(filteredPaths);
      }
    });
  });
}

function pathIsDirectory(path: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, res) => {
      if (res && res.isDirectory()) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

function getJson(path: string): Promise<{[index: string]: any}> {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf8' }, (err, res) => {
      if (err) {
        reject(err);
        return;
      }
      try {
        const json = JSON.parse(res);
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
  });
}

// Recurse through all directories to find jiro dotfiles
async function readDirectory(directory: string): Promise<string[]> {
  const results: string[] = [];

  const paths = await readDir(directory);
  await Promise.all(paths.map(async (path) => {
    const isDirectory = await pathIsDirectory(path);
    if (isDirectory) {
      const contents = await readDirectory(path);
      results.push(...contents);
    } else {
      results.push(path);
    }
  }));

  return results;
}

export async function getKojifilesChangedMessage(): Promise<object> {
  const paths = await readDirectory('/usr/src/app');
  const filteredPaths = paths.filter(path => path.includes('koji') && path.endsWith('.json'));

  const projectConfig: KojifilesChanged = {
    services: [],
  };

  let protocol: string | null = null;
  let serverId: string | null = null;
  let hostname: string | null = null;
  if (process.env.KOJI_PROXY_HOST) {
    const proxyHost = JSON.parse(process.env.KOJI_PROXY_HOST);
    protocol = proxyHost.protocol;
    serverId = proxyHost.serverId;
    hostname = proxyHost.hostname;
  }

  await Promise.all(filteredPaths.map(async (filePath) => {
    try {
      const configFile = await getJson(filePath);

      // All config files are objects, so go through all the keys and
      // add them to the root config
      Object.keys(configFile).forEach((key) => {
        // If the key already exists in the project config, use it
        if (projectConfig[key]) {
          if (Array.isArray(projectConfig[key]) && Array.isArray(configFile[key])) {
            projectConfig[key] = [
              ...projectConfig[key],
              ...configFile[key],
            ];
          } else {
            projectConfig[key] = {
              ...projectConfig[key],
              ...configFile[key],
            };
          }
        } else {
          configFile[key]['@@PATH'] = filePath.replace('/usr/src/app/', '');
          projectConfig[key] = configFile[key];
        }

        if (key === 'develop') {
          try {
            projectConfig.services = Object.keys(configFile.develop).map(key => ({
              name: key,
              frameUrl: `${protocol}${configFile.develop[key].port}-${serverId}--inline.${hostname}`,
              rawUrl: `${protocol}${configFile.develop[key].port}-${serverId}.${hostname}`,
            }));
          } catch (err) {
            //
          }
        }
      });
    } catch (err) {
      //
    }
  }));

  return OutboundMessage.getKojifilesChangedCommand(projectConfig);
}
