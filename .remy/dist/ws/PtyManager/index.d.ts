import { Server } from '../Server';
import { PtyFrame } from '../model/OutboundMessage';
export declare class PtyManager {
    private readonly server;
    private readonly projectPath;
    private readonly creatorUsername;
    private ptys;
    private secretsMap;
    private readonly defaultPtys;
    constructor(server: Server, projectPath: string, creatorUsername: string);
    spawnDefaultPtys(): Promise<void>;
    spawn(cwdOrNull?: string, nameOrNull?: string, startCommandOrNull?: string): Promise<void>;
    kill(ptyId: string): void;
    write(ptyId: string, frame: PtyFrame): void;
    resize(ptyId: string, cols: number, rows: number): void;
    readonly ptyStatusChangedMessage: object;
    private updateStatus;
    private killAll;
    private refreshProjectSecretsMap;
}
