import { Server } from '../Server';
import { GitStatusChanged } from '../model/OutboundMessage';
export declare class GitManager {
    private readonly server;
    private readonly git;
    private isOperationInProgress;
    private isPushInProgress;
    private isLoading;
    private cachedStatus;
    constructor(server: Server);
    readonly statusChangedMessage: GitStatusChanged;
    markGitOperationInProgress(isInProgress: boolean): void;
    statusChanged(): void;
    updateStatus(): Promise<void>;
    updateRemotes(): Promise<{}>;
    createNewVersion(message: string): Promise<void>;
    commitAndPush(file: string, message: string): Promise<void>;
}
