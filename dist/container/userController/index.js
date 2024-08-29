"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userContainer = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
var libs_1 = require("../../libs");
var controllers_1 = require("../../controllers");
var services_1 = require("../../services");
var repositories_1 = require("../../repositories");
var userContainer = new inversify_1.Container();
exports.userContainer = userContainer;
userContainer.bind(utils_1.INTERFACE_TYPE.PasswordService).to(libs_1.PasswordService);
userContainer.bind(utils_1.INTERFACE_TYPE.TokenService).to(libs_1.TokenService);
userContainer.bind(utils_1.INTERFACE_TYPE.UserRepository).to(repositories_1.UserRepository);
userContainer.bind(utils_1.INTERFACE_TYPE.UserService).to(services_1.UserService);
userContainer.bind(utils_1.INTERFACE_TYPE.UserController).to(controllers_1.UserController);
//# sourceMappingURL=index.js.map