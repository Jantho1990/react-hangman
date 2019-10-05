import * as https from 'https';
import * as uuid from 'uuid';

import { Server } from '../Server';
import { OutboundMessage, PtyFrame } from '../model/OutboundMessage';

import { Pty } from './Pty';
import { getEnvAliasesFromKojifiles } from './helpers/getEnvAliasesFromKojifiles';
import { getDefaultPtysFromKojifiles } from './helpers/getDefaultPtysFromKojifiles';

export class PtyManager {
  private readonly server: Server;
  private readonly projectPath: string;
  private readonly creatorUsername: string;

  private ptys: {[index: string]: Pty} = {};
  private secretsMap: {[index: string]: string} = {};
  private readonly defaultPtys: {[index: string]: any}[] = [];

  constructor(server: Server, projectPath: string, creatorUsername: string) {
    this.server = server;
    this.projectPath = projectPath;
    this.creatorUsername = creatorUsername;

    this.spawnDefaultPtys();
  }

  async spawnDefaultPtys() {
    this.killAll();
    await this.refreshProjectSecretsMap();
    const defaultPtys = await getDefaultPtysFromKojifiles();
    defaultPtys.forEach(({ name, cwd, command }) => {
      this.spawn(cwd, name, command);
    });
  }

  async spawn(cwdOrNull?: string, nameOrNull?: string, startCommandOrNull?: string) {
    const ptyId = uuid.v4();

    const cwd = (cwdOrNull) ? `${this.projectPath}/${cwdOrNull}` : this.projectPath;
    const name = nameOrNull || `Terminal ${Object.keys(this.ptys).length + 1}`;

    const pty = new Pty(
      ptyId,
      cwd,
      name,
      this.creatorUsername,
      {
        KOJI_SECRETS: JSON.stringify(this.secretsMap),
        ...(await getEnvAliasesFromKojifiles(this.secretsMap)),
      },
    );

    pty.onData = (frame: PtyFrame) => {
      const message = OutboundMessage.getPtyDataReceivedCommand({
        ptyId,
        frame,
      });
      this.server.broadcast(message);
    };

    pty.onExit = (code: number) => {
      this.kill(ptyId);
    };

    if (startCommandOrNull) {
      pty.write({ value: Buffer.from(`${startCommandOrNull}\r`, 'binary').toString('base64') });
    }

    this.ptys[ptyId] = pty;

    // Broadcast update
    this.updateStatus();
  }

  kill(ptyId: string) {
    if (!this.ptys[ptyId]) {
      return;
    }

    this.ptys[ptyId].kill();
    delete this.ptys[ptyId];

    // Broadcast update
    this.updateStatus();
  }

  write(ptyId: string, frame: PtyFrame) {
    if (!this.ptys[ptyId]) {
      return;
    }

    this.ptys[ptyId].write(frame);
  }

  resize(ptyId: string, cols: number, rows: number) {
    if (!this.ptys[ptyId]) {
      return;
    }

    this.ptys[ptyId].resize(cols, rows);
  }

  get ptyStatusChangedMessage(): object {
    return OutboundMessage.getPtysChangedCommand({
      ptys: Object.values(this.ptys).map(pty => pty.socketExpression),
    });
  }

  private updateStatus() {
    this.server.broadcast(this.ptyStatusChangedMessage);
  }

  private killAll() {
    Object.keys(this.ptys).forEach((ptyId) => {
      this.ptys[ptyId].kill();
    });
    this.ptys = {};
    this.updateStatus();
  }

  // Load project secrets map
  private refreshProjectSecretsMap() {
    return new Promise((resolve, reject) => {
      const projectId = process.env.KOJI_PROJECT_ID;
      const accessToken = process.env.KOJI_GIT_TOKEN;
      const username = process.env.KOJI_GIT_USERNAME;

      try {
        // Load the map from API keystore
        https.get({
          host: 'rest.api.gokoji.com',
          path: `/v1/user/keystore/getProjectMap?projectId=${projectId}`,
          headers: {
            Authorization: `${username}:${accessToken}`,
          },
        }, (res) => {
          let body = '';
          res.on('data', (chunk) => {
            body += chunk;
          });
          res.on('end', () => {
            try {
              this.secretsMap = JSON.parse(body);
            } catch (err) {
              //
            }
            resolve();
            console.log(this.secretsMap);
          });
          res.on('error', () => {
            resolve();
          });
        });
      } catch (err) {
        resolve();
      }
    });
  }
}
