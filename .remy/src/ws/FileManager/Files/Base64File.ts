import * as fs from 'fs';
import { EditorType } from '../../model/OutboundMessage';

import { BaseFile } from './BaseFile';

export class Base64File extends BaseFile {
  async open() {
    this.editorType = EditorType.BINARY;

    if (this.body !== undefined) {
      this.broadcastContents();
      return;
    }

    const stat = fs.statSync(`${this.projectPath}/${this.path}`);
    if (stat.size > 5e6) {
      // File is larger than 5 mb, skip!
      console.log('Skipping giant file', stat.size);
      return;
    }

    fs.readFile(`${this.projectPath}/${this.path}`, { encoding: 'base64' }, (err, data) => {
      if (!err) {
        this.body = data;
        this.broadcastContents();
      }
    });
  }
}
