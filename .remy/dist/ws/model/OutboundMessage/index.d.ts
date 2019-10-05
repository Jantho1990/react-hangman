import { ClientState } from '../ClientState';
import { DiskUsage } from '../../helpers/getDiskUsage';
import { MemoryUsage } from '../../helpers/getMemoryUsage';
import { TreeItem } from '../../FilesystemManager/helpers/buildTree';
export declare namespace OutboundMessage {
    function getSystemStatusChangedCommand(systemStatusChanged: SystemStatusChanged): OutboundMessage;
    function getFilesystemChangedCommand(filesystemChanged: FilesystemChanged): OutboundMessage;
    function getKojifilesChangedCommand(kojifilesChanged: KojifilesChanged): OutboundMessage;
    function getOpenFilesChangedCommand(openFilesChanged: OpenFilesChanged): OutboundMessage;
    function getFileLoadedCommand(fileLoaded: FileLoaded): OutboundMessage;
    function getConnectedClientsChangedCommand(connectedClientsChanged: ConnectedClientsChanged): OutboundMessage;
    function getOperationReceivedCommand(operationReceived: OperationReceived): OutboundMessage;
    function getJsonValueChangedCommand(jsonValueChanged: JsonValueChanged): OutboundMessage;
    function getPtysChangedCommand(ptysChanged: PtysChanged): OutboundMessage;
    function getPtyDataReceivedCommand(ptyDataReceived: PtyDataReceived): OutboundMessage;
    function getGitStatusChangedCommand(gitStatusChanged: GitStatusChanged): OutboundMessage;
    function getGitErrorCommand(gitError: GitError): OutboundMessage;
    enum Type {
        SYSTEM_STATUS_CHANGED = "system/status_changed",
        FILESYSTEM_CHANGED = "fs/changed",
        KOJIFILES_CHANGED = "fs/kojifiles_changed",
        OPEN_FILES_CHANGED = "file/open_files_changed",
        FILE_LOADED = "file/loaded",
        CONNECTED_CLIENTS_CHANGED = "file/connected_clients_changed",
        OPERATION_RECEIVED = "file/operation_received",
        JSON_VALUE_CHANGED = "file/json_value_changed",
        PTYS_CHANGED = "pty/changed",
        PTY_DATA_RECEIVED = "pty/data_received",
        GIT_STATUS_CHANGED = "git/status_changed",
        GIT_ERROR = "git/error"
    }
    interface OutboundMessage {
        type: Type;
        connectedClientsChanged?: ConnectedClientsChanged | null;
        systemStatusChanged?: SystemStatusChanged | null;
        filesystemChanged?: FilesystemChanged | null;
        kojifilesChanged?: KojifilesChanged | null;
        openFilesChanged?: OpenFilesChanged | null;
        fileLoaded?: FileLoaded | null;
        operationReceived?: OperationReceived | null;
        jsonValueChanged?: JsonValueChanged | null;
        ptysChanged?: PtysChanged | null;
        ptyDataReceived?: PtyDataReceived | null;
        gitStatusChanged?: GitStatusChanged | null;
        gitError?: GitError | null;
    }
}
export interface SystemStatusChanged {
    filesystemStatus: 'syncing' | 'synced';
    memoryUsage: MemoryUsage;
    diskUsage: DiskUsage;
}
export interface ConnectedClientsChanged {
    clients: ClientState[];
}
export interface FilesystemChanged {
    paths: string[];
    tree: TreeItem[];
}
export interface Service {
    name: string;
    frameUrl: string;
    rawUrl: string;
    loadedHook?: string;
}
export interface KojifilesChanged {
    services: Service[];
    [key: string]: any;
}
export declare enum EditorType {
    VISUAL = "visual",
    CODE = "code",
    BINARY = "binary"
}
export interface OpenFile {
    path: string;
    sticky: boolean;
    editorType: EditorType;
    hasUnsavedChanges: boolean;
    hasChangedOnDisk: boolean;
}
export interface OpenFilesChanged {
    openFiles: OpenFile[];
    currentFile: string | null;
}
export interface FileLoaded {
    path: string;
    body: string;
}
export interface OperationReceived {
    sessionId: string;
    path: string;
    operation: string;
    ts: number;
}
export interface JsonValueChanged {
    sessionId: string;
    path: string;
    key: string;
    newValue: string;
}
export interface PtyExpression {
    ptyId: string;
    ptyName?: string;
    frames: PtyFrame[];
}
export interface PtysChanged {
    ptys: PtyExpression[];
}
export interface PtyFrame {
    frameId?: string;
    value: string;
}
export interface PtyDataReceived {
    ptyId: string;
    frame: PtyFrame;
}
export interface GitStatusChanged {
    status: {
        [index: string]: any;
    };
}
export interface GitError {
    error: string;
}
