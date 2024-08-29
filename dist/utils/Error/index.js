"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
var httpCodes_1 = require("../Enum/httpCodes");
var AppError = /** @class */ (function (_super) {
    __extends(AppError, _super);
    function AppError(statusCode, message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message || httpCodes_1.ErrorMessages[statusCode] || 'Error') || this;
        _this.statusCode = statusCode;
        Object.setPrototypeOf(_this, _newTarget.prototype); // Prototip zincirini korur
        Error.captureStackTrace(_this);
        return _this;
    }
    return AppError;
}(Error));
exports.AppError = AppError;
//# sourceMappingURL=index.js.map