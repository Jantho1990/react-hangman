"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var https = require("https");
var uuid = require("uuid");
var OutboundMessage_1 = require("../model/OutboundMessage");
var Pty_1 = require("./Pty");
var getEnvAliasesFromKojifiles_1 = require("./helpers/getEnvAliasesFromKojifiles");
var getDefaultPtysFromKojifiles_1 = require("./helpers/getDefaultPtysFromKojifiles");
var PtyManager = /** @class */ (function () {
    function PtyManager(server, projectPath, creatorUsername) {
        this.ptys = {};
        this.secretsMap = {};
        this.defaultPtys = [];
        this.server = server;
        this.projectPath = projectPath;
        this.creatorUsername = creatorUsername;
        this.spawnDefaultPtys();
    }
    PtyManager.prototype.spawnDefaultPtys = function () {
        return __awaiter(this, void 0, void 0, function () {
            var defaultPtys;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.killAll();
                        return [4 /*yield*/, this.refreshProjectSecretsMap()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, getDefaultPtysFromKojifiles_1.getDefaultPtysFromKojifiles()];
                    case 2:
                        defaultPtys = _a.sent();
                        defaultPtys.forEach(function (_a) {
                            var name = _a.name, cwd = _a.cwd, command = _a.command;
                            _this.spawn(cwd, name, command);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    PtyManager.prototype.spawn = function (cwdOrNull, nameOrNull, startCommandOrNull) {
        return __awaiter(this, void 0, void 0, function () {
            var ptyId, cwd, name, pty, _a, _b, _c;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        ptyId = uuid.v4();
                        cwd = (cwdOrNull) ? this.projectPath + "/" + cwdOrNull : this.projectPath;
                        name = nameOrNull || "Terminal " + (Object.keys(this.ptys).length + 1);
                        _a = Pty_1.Pty.bind;
                        _b = [void 0, ptyId,
                            cwd,
                            name,
                            this.creatorUsername];
                        _c = [{ KOJI_SECRETS: JSON.stringify(this.secretsMap) }];
                        return [4 /*yield*/, getEnvAliasesFromKojifiles_1.getEnvAliasesFromKojifiles(this.secretsMap)];
                    case 1:
                        pty = new (_a.apply(Pty_1.Pty, _b.concat([__assign.apply(void 0, _c.concat([(_d.sent())]))])))();
                        pty.onData = function (frame) {
                            var message = OutboundMessage_1.OutboundMessage.getPtyDataReceivedCommand({
                                ptyId: ptyId,
                                frame: frame,
                            });
                            _this.server.broadcast(message);
                        };
                        pty.onExit = function (code) {
                            _this.kill(ptyId);
                        };
                        if (startCommandOrNull) {
                            pty.write({ value: Buffer.from(startCommandOrNull + "\r", 'binary').toString('base64') });
                        }
                        this.ptys[ptyId] = pty;
                        // Broadcast update
                        this.updateStatus();
                        return [2 /*return*/];
                }
            });
        });
    };
    PtyManager.prototype.kill = function (ptyId) {
        if (!this.ptys[ptyId]) {
            return;
        }
        this.ptys[ptyId].kill();
        delete this.ptys[ptyId];
        // Broadcast update
        this.updateStatus();
    };
    PtyManager.prototype.write = function (ptyId, frame) {
        if (!this.ptys[ptyId]) {
            return;
        }
        this.ptys[ptyId].write(frame);
    };
    PtyManager.prototype.resize = function (ptyId, cols, rows) {
        if (!this.ptys[ptyId]) {
            return;
        }
        this.ptys[ptyId].resize(cols, rows);
    };
    Object.defineProperty(PtyManager.prototype, "ptyStatusChangedMessage", {
        get: function () {
            return OutboundMessage_1.OutboundMessage.getPtysChangedCommand({
                ptys: Object.values(this.ptys).map(function (pty) { return pty.socketExpression; }),
            });
        },
        enumerable: true,
        configurable: true
    });
    PtyManager.prototype.updateStatus = function () {
        this.server.broadcast(this.ptyStatusChangedMessage);
    };
    PtyManager.prototype.killAll = function () {
        var _this = this;
        Object.keys(this.ptys).forEach(function (ptyId) {
            _this.ptys[ptyId].kill();
        });
        this.ptys = {};
        this.updateStatus();
    };
    // Load project secrets map
    PtyManager.prototype.refreshProjectSecretsMap = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var projectId = process.env.KOJI_PROJECT_ID;
            var accessToken = process.env.KOJI_GIT_TOKEN;
            var username = process.env.KOJI_GIT_USERNAME;
            try {
                // Load the map from API keystore
                https.get({
                    host: 'rest.api.gokoji.com',
                    path: "/v1/user/keystore/getProjectMap?projectId=" + projectId,
                    headers: {
                        Authorization: username + ":" + accessToken,
                    },
                }, function (res) {
                    var body = '';
                    res.on('data', function (chunk) {
                        body += chunk;
                    });
                    res.on('end', function () {
                        try {
                            _this.secretsMap = JSON.parse(body);
                        }
                        catch (err) {
                            //
                        }
                        resolve();
                        console.log(_this.secretsMap);
                    });
                    res.on('error', function () {
                        resolve();
                    });
                });
            }
            catch (err) {
                resolve();
            }
        });
    };
    return PtyManager;
}());
exports.PtyManager = PtyManager;
//# sourceMappingURL=index.js.map