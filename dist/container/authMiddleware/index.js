"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddlewareContainer = void 0;
var auth_1 = require("../../middleware/auth");
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
var auth_2 = require("../../services/auth");
var libs_1 = require("../../libs");
var repositories_1 = require("../../repositories");
var authMiddlewareContainer = new inversify_1.Container();
exports.authMiddlewareContainer = authMiddlewareContainer;
authMiddlewareContainer.bind(utils_1.INTERFACE_TYPE.TokenService).to(libs_1.TokenService);
authMiddlewareContainer.bind(utils_1.INTERFACE_TYPE.PasswordService).to(libs_1.PasswordService);
authMiddlewareContainer.bind(utils_1.INTERFACE_TYPE.UserRepository).to(repositories_1.UserRepository);
authMiddlewareContainer.bind(utils_1.INTERFACE_TYPE.AuthService).to(auth_2.AuthService);
authMiddlewareContainer.bind(utils_1.INTERFACE_TYPE.AuthMiddleware).to(auth_1.AuthMiddleware);
//# sourceMappingURL=index.js.map