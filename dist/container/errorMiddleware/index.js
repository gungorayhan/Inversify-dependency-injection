"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorContainer = void 0;
var inversify_1 = require("inversify");
var error_1 = require("../../middleware/error");
var utils_1 = require("../../utils");
var errorContainer = new inversify_1.Container();
exports.errorContainer = errorContainer;
errorContainer.bind(utils_1.INTERFACE_TYPE.ErrorMiddleware).to(error_1.ErrorMiddleware);
//# sourceMappingURL=index.js.map