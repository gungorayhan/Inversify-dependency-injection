"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = exports.AuthRouter = exports.UserRouter = void 0;
var express_1 = require("express");
var user_1 = require("./user");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return user_1.UserRouter; } });
var auth_1 = require("./auth");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return auth_1.AuthRouter; } });
var user_2 = require("./user");
var auth_2 = require("./auth");
var router = (0, express_1.Router)();
exports.Router = router;
router.use('/user', user_2.UserRouter);
router.use('/auth', auth_2.AuthRouter);
//# sourceMappingURL=index.js.map