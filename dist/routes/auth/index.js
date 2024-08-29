"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
var express_1 = require("express");
var authController_1 = require("../../container/authController");
var utils_1 = require("../../utils");
var dtoMiddleware_1 = require("../../container/dtoMiddleware");
var user_1 = require("../../dto/user");
var router = (0, express_1.Router)();
exports.AuthRouter = router;
// router.post("/login", AuthContainer.login.bind(AuthContainer))
// router.post("/register", AuthContainer.register.bind(AuthContainer))
// router.post("/logout", AuthContainer.logout.bind(AuthContainer))
var controllers = authController_1.authContainer.get(utils_1.INTERFACE_TYPE.AuthController);
var dtoMiddleware = dtoMiddleware_1.dtoMiddlewareContainer.get(utils_1.INTERFACE_TYPE.DtoMiddleware);
router.post("/login", dtoMiddleware.validate(user_1.LoginDto).bind(dtoMiddleware), controllers.login.bind(controllers));
router.post("/register", controllers.register.bind(controllers));
router.post("/logout", controllers.logout.bind(controllers));
//# sourceMappingURL=index.js.map