"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseHandler = void 0;
var inversify_1 = require("inversify");
//herhangi bir yerde kullanılmadı deneme amaçlı yazıldı
var ResponseHandler = /** @class */ (function () {
    // private successService;
    // private errorService;
    function ResponseHandler() {
    }
    ResponseHandler.prototype.success = function (res, code, message, data) {
        res.status(code).json({
            status: "success",
            message: message,
            data: data
        });
    };
    ResponseHandler.prototype.error = function (error, res, code, message, data) {
        res.status(code).json({
            status: "success",
            message: error.message,
            data: data
        });
    };
    ResponseHandler = __decorate([
        (0, inversify_1.injectable)(),
        __metadata("design:paramtypes", [])
    ], ResponseHandler);
    return ResponseHandler;
}());
exports.ResponseHandler = ResponseHandler;
//# sourceMappingURL=index.js.map