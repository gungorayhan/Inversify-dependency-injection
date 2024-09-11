"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheMiddleware = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
// @injectable()
// export class CacheMiddleware {
//     private redis: IRedisService
//     constructor(@inject(INTERFACE_TYPE.Redis) redis: IRedisService) {
//         this.redis = redis
//     }
//     async handle(req: Request, res: Response, next: NextFunction) {
//         const key = req.originalUrl
//         const cachedData = await this.redis.get(key);
//         if (cachedData) {
//             return res.json(JSON.parse(cachedData)) //json data
//         }
//         const sendResponse = res.json;
//         res.json = (body) => {
//             this.redis.set(key, JSON.stringify(body), 3600); // Cache'leme süresi: 1 saat
//             return sendResponse.call(res, body);
//         }
//         next();
//     }
// }
var CacheMiddleware = /** @class */ (function () {
    function CacheMiddleware(redis) {
        this.redis = redis;
    }
    CacheMiddleware.prototype.handle = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var key, cachedData, parsedData, err_1, sendResponse;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = req.originalUrl;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.redis.get(key)];
                    case 2:
                        cachedData = _a.sent();
                        if (cachedData) {
                            try {
                                parsedData = JSON.parse(cachedData);
                                // console.log(parsedData)
                                return [2 /*return*/, res.json(parsedData)]; // JSON verisini döndür
                            }
                            catch (e) {
                                // Eğer parse edilemiyorsa string formatında return et
                                // console.log(cachedData)
                                return [2 /*return*/, res.json(cachedData)];
                            }
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.error("Redis'ten veri alınırken hata oluştu:", err_1);
                        return [3 /*break*/, 4];
                    case 4:
                        sendResponse = res.json.bind(res);
                        res.json = function (body) {
                            var cacheValue = typeof body === "object" ? JSON.stringify(body) : body;
                            _this.redis.set(key, cacheValue, 3600); // 1 saat boyunca cache'le
                            return sendResponse(body); // Orijinal cevabı döndür
                        };
                        next();
                        return [2 /*return*/];
                }
            });
        });
    };
    CacheMiddleware = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.Redis)),
        __metadata("design:paramtypes", [Object])
    ], CacheMiddleware);
    return CacheMiddleware;
}());
exports.CacheMiddleware = CacheMiddleware;
//# sourceMappingURL=index.js.map