"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cachedContainer = void 0;
var inversify_1 = require("inversify");
var cache_1 = require("../../middleware/cache");
var utils_1 = require("../../utils");
var redis_1 = require("../../libs/redis");
var cachedContainer = new inversify_1.Container();
exports.cachedContainer = cachedContainer;
cachedContainer.bind(utils_1.INTERFACE_TYPE.Redis).to(redis_1.RedisService);
cachedContainer.bind(utils_1.INTERFACE_TYPE.CachedMiddleware).to(cache_1.CacheMiddleware);
//# sourceMappingURL=index.js.map