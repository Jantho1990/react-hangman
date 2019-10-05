"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var OutboundMessage_1 = require("../model/OutboundMessage");
var fileFactory_1 = require("./Files/fileFactory");
var FileManager = /** @class */ (function () {
    function FileManager(server, projectPath, gitManager) {
        this.currentFile = null;
        this.files = [];
        this.lastOpenFilesMessage = null;
        this.server = server;
        this.projectPath = projectPath;
        this.gitManager = gitManager;
    }
    Object.defineProperty(FileManager.prototype, "openFilesMessage", {
        get: function () {
            return OutboundMessage_1.OutboundMessage.getOpenFilesChangedCommand({
                openFiles: this.files.map(function (file) { return file.socketExpression; }),
                currentFile: this.currentFile,
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FileManager.prototype, "currentFileMessage", {
        get: function () {
            if (this.currentFile) {
                var file = this.fileForPath(this.currentFile);
                if (file) {
                    return file.fileLoadedMessage;
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    FileManager.prototype.indexForPath = function (path) {
        var index = this.files.findIndex(function (file) { return file.path === path; });
        if (index === -1) {
            return undefined;
        }
        return index;
    };
    FileManager.prototype.fileForPath = function (path) {
        var index = this.indexForPath(path);
        if (index !== undefined) {
            return this.files[index];
        }
        return null;
    };
    FileManager.prototype.onOpenFilesChanged = function () {
        // Don't broadcast if nothing has changed
        var newMessage = this.openFilesMessage;
        if (this.lastOpenFilesMessage) {
            if (JSON.stringify(newMessage) === JSON.stringify(this.lastOpenFilesMessage)) {
                return;
            }
        }
        this.lastOpenFilesMessage = newMessage;
        this.server.broadcast(newMessage);
    };
    FileManager.prototype.open = function (path, editorType) {
        var existingFile = this.fileForPath(path);
        if (existingFile) {
            // File already open, broadcast contents
            existingFile.setSticky();
            existingFile.open(editorType);
        }
        else {
            // If the last item isn't sticky, remove it before pushing
            if (this.files.length > 0) {
                if (!this.files[this.files.length - 1].isSticky) {
                    this.files.pop();
                }
            }
            var file = fileFactory_1.fileFactory(this.server, this.projectPath, path);
            this.files.push(file);
            file.open(editorType);
        }
        // Set the file as the current file
        this.currentFile = path;
        this.onOpenFilesChanged();
    };
    FileManager.prototype.close = function (path) {
        var index = this.indexForPath(path);
        if (index === undefined) {
            return;
        }
        var file = this.fileForPath(path);
        if (file && file.close) {
            file.close();
        }
        // Set a new current file if we need to
        if (this.currentFile === path) {
            if (index === 0) {
                if (this.files.length > 1) {
                    this.currentFile = this.files[index + 1].path;
                }
                else {
                    this.currentFile = null;
                }
            }
            else {
                this.currentFile = this.files[index - 1].path;
            }
        }
        // Remove the file (closed)
        this.files.splice(index, 1);
        this.onOpenFilesChanged();
        if (this.currentFile) {
            var file_1 = this.fileForPath(this.currentFile);
            if (file_1) {
                file_1.broadcastContents();
            }
        }
    };
    FileManager.prototype.applyOperation = function (sessionId, path, operation) {
        var file = this.fileForPath(path);
        if (!file) {
            return;
        }
        file.setSticky();
        if (file.applyOperation) {
            file.applyOperation(sessionId, operation);
            this.onOpenFilesChanged();
        }
    };
    FileManager.prototype.jsonSetValueAtPath = function (sessionId, path, key, newValue) {
        var file = this.fileForPath(path);
        if (!file) {
            return;
        }
        file.setSticky();
        if (file.jsonSetValue) {
            file.jsonSetValue(sessionId, key, newValue);
            this.onOpenFilesChanged();
        }
    };
    FileManager.prototype.save = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = this.fileForPath(path);
                        if (!file) {
                            return [2 /*return*/];
                        }
                        if (!file.save) return [3 /*break*/, 2];
                        return [4 /*yield*/, file.save()];
                    case 1:
                        _a.sent();
                        this.onOpenFilesChanged();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    FileManager.prototype.onFilesMoved = function (source, dest) {
        var _this = this;
        this.files
            .filter(function (_a) {
            var path = _a.path;
            return path.startsWith(source);
        })
            .forEach(function (file) {
            var path = file.path;
            var newPath = path.replace(source, dest);
            _this.close(path);
            _this.open(newPath);
        });
    };
    FileManager.prototype.onFileRemoved = function (path) {
        this.close(path);
    };
    FileManager.prototype.onFileChangedOnDisk = function (path) {
        if (path !== this.currentFile) {
            var file = this.fileForPath(path);
            if (file) {
                file.setHasChangedOnDisk();
                this.onOpenFilesChanged();
            }
        }
    };
    return FileManager;
}());
exports.FileManager = FileManager;
//# sourceMappingURL=index.js.map