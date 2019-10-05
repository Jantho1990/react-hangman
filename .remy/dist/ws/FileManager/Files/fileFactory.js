"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File_1 = require("./File");
var SyntheticFile_1 = require("./SyntheticFile");
var Base64File_1 = require("./Base64File");
function fileFactory(server, projectPath, path) {
    if (path.startsWith('synthetic!')) {
        return new SyntheticFile_1.SyntheticFile(server, projectPath, path);
    }
    var binaryExtensions = [
        'jpg',
        'jpeg',
        'png',
        'gif',
        'mp3',
        'mp4',
        'webm',
    ];
    var extension = path.split('.').pop();
    if (extension && binaryExtensions.includes(extension)) {
        return new Base64File_1.Base64File(server, projectPath, path);
    }
    return new File_1.File(server, projectPath, path);
}
exports.fileFactory = fileFactory;
//# sourceMappingURL=fileFactory.js.map