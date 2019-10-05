import * as fs from 'fs';

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

export interface DefaultPty {
  name: string;
  cwd: string;
  command: string;
}

export async function getDefaultPtysFromKojifiles(): Promise<DefaultPty[]> {
  const paths = await readDirectory('/usr/src/app');
  const filteredPaths = paths.filter(path => path.includes('koji') && path.endsWith('.json'));

  const projectConfig: {[index: string]: any} = {};

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
          projectConfig[key] = configFile[key];
        }
      });
    } catch (err) {
      //
    }
  }));

  const defaultPtys: DefaultPty[] = [];
  try {
    Object.keys(projectConfig.develop).forEach((key) => {
      const service = projectConfig.develop[key];
      defaultPtys.push({
        name: key,
        cwd: service.path || '',
        command: service.startCommand || '',
      });
    });
  } catch (err) {
    //
  }

  return defaultPtys;
}
