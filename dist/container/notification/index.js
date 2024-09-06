"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationContainer = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
var libs_1 = require("../../libs");
var services_1 = require("../../services");
var repositories_1 = require("../../repositories");
var events_1 = require("../../libs/events");
var notification_1 = require("../../libs/notification");
var notificationContainer = new inversify_1.Container();
exports.notificationContainer = notificationContainer;
notificationContainer.bind(utils_1.INTERFACE_TYPE.PasswordService).to(libs_1.PasswordService);
notificationContainer.bind(utils_1.INTERFACE_TYPE.TokenService).to(libs_1.TokenService);
notificationContainer.bind(utils_1.INTERFACE_TYPE.UserRepository).to(repositories_1.UserRepository);
notificationContainer.bind(utils_1.INTERFACE_TYPE.EventEmitter).to(events_1.Emitter);
notificationContainer.bind(utils_1.INTERFACE_TYPE.UserService).to(services_1.UserService);
notificationContainer.bind(utils_1.INTERFACE_TYPE.Notification).to(notification_1.NotificationServices);
//# sourceMappingURL=index.js.map