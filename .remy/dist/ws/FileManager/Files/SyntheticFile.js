"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseFile_1 = require("./BaseFile");
var OutboundMessage_1 = require("../../model/OutboundMessage");
var SyntheticFile = /** @class */ (function (_super) {
    __extends(SyntheticFile, _super);
    function SyntheticFile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SyntheticFile.prototype.open = function () {
        this.editorType = OutboundMessage_1.EditorType.VISUAL;
    };
    SyntheticFile.prototype.close = function () {
        //
    };
    return SyntheticFile;
}(BaseFile_1.BaseFile));
exports.SyntheticFile = SyntheticFile;
//# sourceMappingURL=SyntheticFile.js.map