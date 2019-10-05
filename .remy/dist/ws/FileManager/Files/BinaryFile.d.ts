import { EditorType } from '../../model/OutboundMessage';
import { BaseFile } from './BaseFile';
export declare class BinaryFile extends BaseFile {
    open(editorType?: EditorType): Promise<void>;
}
