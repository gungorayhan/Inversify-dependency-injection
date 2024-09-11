"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
var express_1 = require("express");
var userController_1 = require("../../container/userController");
var authMiddleware_1 = require("../../container/authMiddleware");
var utils_1 = require("../../utils");
var cacheMiddleware_1 = require("../../container/cacheMiddleware");
// import {  UserContainer } from "../../container";
var router = (0, express_1.Router)();
exports.UserRouter = router;
// router.get("/",AuthMiddlewareContainer.authenticate.bind(AuthMiddlewareContainer),UserContainer.getUserAll.bind(UserContainer))
// router.get("/:id",UserContainer.getUserById.bind(UserContainer))
// router.post("/",UserContainer.createUser.bind(UserContainer))
var controllers = userController_1.userContainer.get(utils_1.INTERFACE_TYPE.UserController);
var authMiddleware = authMiddleware_1.authMiddlewareContainer.get(utils_1.INTERFACE_TYPE.AuthMiddleware);
var cachedMiddleware = cacheMiddleware_1.cachedContainer.get(utils_1.INTERFACE_TYPE.CachedMiddleware);
router.get("/", authMiddleware.authenticate.bind(authMiddleware), cachedMiddleware.handle.bind(cachedMiddleware), controllers.getUserAll.bind(controllers));
router.get("/:id", controllers.getUserById.bind(controllers));
router.post("/", controllers.createUser.bind(controllers));
//# sourceMappingURL=index.js.map