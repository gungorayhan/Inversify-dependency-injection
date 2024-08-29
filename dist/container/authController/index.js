"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authContainer = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
var controllers_1 = require("../../controllers");
var auth_1 = require("../../services/auth");
var repositories_1 = require("../../repositories");
var libs_1 = require("../../libs");
var authContainer = new inversify_1.Container();
exports.authContainer = authContainer;
authContainer.bind(utils_1.INTERFACE_TYPE.PasswordService).to(libs_1.PasswordService);
authContainer.bind(utils_1.INTERFACE_TYPE.TokenService).to(libs_1.TokenService);
authContainer.bind(utils_1.INTERFACE_TYPE.UserRepository).to(repositories_1.UserRepository);
authContainer.bind(utils_1.INTERFACE_TYPE.AuthService).to(auth_1.AuthService);
authContainer.bind(utils_1.INTERFACE_TYPE.AuthController).to(controllers_1.AuthController);
//# sourceMappingURL=index.js.map