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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublisherService = void 0;
var inversify_1 = require("inversify");
var _1 = require("./");
var utils_1 = require("../../utils");
var PublisherService = /** @class */ (function () {
    function PublisherService(emitter) {
    }
    PublisherService.prototype.publishEvent = function (eventName, data) {
        this.emitter.publish(eventName, data);
        console.log("Event ".concat(eventName, " published with data:"), data);
    };
    PublisherService = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.EventEmitter)),
        __metadata("design:paramtypes", [_1.Emitter])
    ], PublisherService);
    return PublisherService;
}());
exports.PublisherService = PublisherService;
//# sourceMappingURL=publisher.js.map