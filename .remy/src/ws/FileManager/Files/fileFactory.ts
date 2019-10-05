import { Server } from '../../Server';

import { BaseFile } from './BaseFile';
import { File } from './File';
import { SyntheticFile } from './SyntheticFile';
import { Base64File } from './Base64File';

export function fileFactory(server: Server, projectPath: string, path: string): BaseFile {
  if (path.startsWith('synthetic!')) {
    return new SyntheticFile(server, projectPath, path);
  }

  const binaryExtensions = [
    'jpg',
    'jpeg',
    'png',
    'gif',
    'mp3',
    'mp4',
    'webm',
  ];
  const extension = path.split('.').pop();
  if (extension && binaryExtensions.includes(extension)) {
    return new Base64File(server, projectPath, path);
  }

  return new File(server, projectPath, path);
}
