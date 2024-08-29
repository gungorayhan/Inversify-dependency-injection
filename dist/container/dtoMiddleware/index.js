"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dtoMiddlewareContainer = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
var dto_1 = require("../../middleware/dto");
var dtoMiddlewareContainer = new inversify_1.Container();
exports.dtoMiddlewareContainer = dtoMiddlewareContainer;
dtoMiddlewareContainer.bind(utils_1.INTERFACE_TYPE.DtoMiddleware).to(dto_1.DtoMiddleware);
//# sourceMappingURL=index.js.map