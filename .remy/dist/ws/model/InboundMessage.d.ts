import { PtyFrame, EditorType } from './OutboundMessage';
export interface InboundMessage {
    type: InboundMessage.Type;
}
export interface InboundLsMessage extends InboundMessage {
    ls: InboundMessage.LsPayload;
}
export interface InboundRmMessage extends InboundMessage {
    rm: InboundMessage.RmPayload;
}
export interface InboundMvMessage extends InboundMessage {
    mv: InboundMessage.MvPayload;
}
export interface InboundTouchMessage extends InboundMessage {
    touch: InboundMessage.TouchPayload;
}
export interface InboundUploadFileMessage extends InboundMessage {
    uploadFile: InboundMessage.UploadFilePayload;
}
export interface InboundOpenFileMessage extends InboundMessage {
    openFile: InboundMessage.OpenFilePayload;
}
export interface InboundCloseFileMessage extends InboundMessage {
    closeFile: InboundMessage.CloseFilePayload;
}
export interface InboundSaveFileMessage extends InboundMessage {
    saveFile: InboundMessage.SaveFilePayload;
}
export interface InboundSetSelectionMessage extends InboundMessage {
    setSelection: InboundMessage.SetSelectionPayload;
}
export interface InboundApplyOperationMessage extends InboundMessage {
    applyOperation: InboundMessage.ApplyOperationPayload;
}
export interface InboundJsonSetValueMessage extends InboundMessage {
    jsonSetValue: InboundMessage.JsonSetValuePayload;
}
export interface InboundPtySpawnMessage extends InboundMessage {
    ptySpawn: InboundMessage.PtySpawnPayload;
}
export interface InboundPtyKillMessage extends InboundMessage {
    ptyKill: InboundMessage.PtyKillPayload;
}
export interface InboundPtyWriteMessage extends InboundMessage {
    ptyWrite: InboundMessage.PtyWritePayload;
}
export interface InboundPtyResizeMessage extends InboundMessage {
    ptyResize: InboundMessage.PtyResizePayload;
}
export interface InboundPtyReloadMessage extends InboundMessage {
    ptyReload: InboundMessage.PtyReloadPayload;
}
export interface InboundGitLoadStatusMessage extends InboundMessage {
    gitLoadStatus: InboundMessage.GitLoadStatusPayload;
}
export interface InboundGitCreateNewVersionMessage extends InboundMessage {
    gitCreateNewVersion: InboundMessage.GitCreateNewVersionPayload;
}
export declare namespace InboundMessage {
    enum Type {
        LS = "fs/ls",
        RM = "fs/rm",
        MV = "fs/mv",
        TOUCH = "fs/touch",
        UPLOAD = "fs/upload",
        OPEN_FILE = "file/open_file",
        CLOSE_FILE = "file/close_file",
        SAVE_FILE = "file/save_file",
        SET_SELECTION = "file/set_selection",
        APPLY_OPERATION = "file/apply_operation",
        JSON_SET_VALUE = "file/json_set_value",
        PTY_SPAWN = "pty/spawn",
        PTY_KILL = "pty/kill",
        PTY_WRITE = "pty/write",
        PTY_RESIZE = "pty/resize",
        PTY_RELOAD = "pty/reload",
        GIT_LOAD_STATUS = "git/load_status",
        GIT_CREATE_NEW_VERSION = "git/new_version"
    }
    interface LsPayload {
    }
    interface RmPayload {
        path: string;
    }
    interface MvPayload {
        source: string;
        dest: string;
    }
    interface TouchPayload {
        path: string;
    }
    interface UploadFilePayload {
        path: string;
        body: string;
    }
    interface OpenFilePayload {
        path: string;
        editorType?: EditorType;
    }
    interface CloseFilePayload {
        path: string;
    }
    interface SaveFilePayload {
        path: string;
        options?: {
            commitImmediately?: boolean;
            commitMessage?: string;
        };
    }
    interface ApplyOperationPayload {
        path: string;
        operation: string;
    }
    interface JsonSetValuePayload {
        path: string;
        key: string;
        newValue: string;
    }
    interface SetSelectionPayload {
        path: string;
        caretIndex: number;
        range: number;
    }
    interface PtySpawnPayload {
        name?: string;
    }
    interface PtyKillPayload {
        ptyId: string;
    }
    interface PtyWritePayload {
        ptyId: string;
        frame: PtyFrame;
    }
    interface PtyResizePayload {
        ptyId: string;
        cols: number;
        rows: number;
    }
    interface PtyReloadPayload {
    }
    interface GitLoadStatusPayload {
    }
    interface GitCreateNewVersionPayload {
        message: string;
    }
}
