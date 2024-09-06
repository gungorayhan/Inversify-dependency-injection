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
exports.NotificationServices = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
//subscribeServices
var NotificationServices = /** @class */ (function () {
    function NotificationServices(userService) {
        this.userService = userService;
        if (!this.userService) {
            throw new Error("UserService is not defined");
        }
        this.userService.subscribeToUserCreated(this.sendCreateUserNotification.bind(this));
    }
    NotificationServices.prototype.sendCreateUserNotification = function (userData) {
        console.log("Sending notification for user: ".concat(userData));
    };
    NotificationServices = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.UserService)),
        __metadata("design:paramtypes", [Object])
    ], NotificationServices);
    return NotificationServices;
}());
exports.NotificationServices = NotificationServices;
//# sourceMappingURL=index.js.map