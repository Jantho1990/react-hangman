export declare class Server {
    private readonly filesystemManager;
    private readonly fileManager;
    private readonly ptyManager;
    private readonly gitManager;
    private readonly server;
    private readonly wss;
    readonly creatorUsername: string;
    private clients;
    private systemStatusInterval;
    private cachedSystemStatusMessage;
    constructor(port: number, projectPath: string, creatorUsername: string, remoteBucketName: string, remoteBucketPrefix: string);
    updateSystemStatus(): Promise<void>;
    broadcast(message: object): void;
    broadcastConnectedClients(): void;
    shutdown(): Promise<void[]>;
    private initWss;
}
