import { EditorType } from '../../model/OutboundMessage';
import { BaseFile } from './BaseFile';
export declare class File extends BaseFile {
    readonly realPath: string;
    open(editorType?: EditorType): Promise<void>;
    applyOperation(fromSessionId: string, operationString: string): void;
    jsonSetValue(fromSessionId: string, key: string, newValue: string): void;
    save(): Promise<any>;
}
