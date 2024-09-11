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
exports.UserService = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
var Error_1 = require("../../utils/Error");
var UserService = /** @class */ (function () {
    // private redis:IRedisService
    function UserService(userRepository, tokenService, passwordService, emitter) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
        this.emitter = emitter;
        // this.redis=redis
    }
    UserService.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.createUser(user)];
                    case 1:
                        result = _a.sent();
                        this.emitter.publish('userCreated', result);
                        return [2 /*return*/, result];
                    case 2:
                        error_1 = _a.sent();
                        // Hata mesajını değiştirerek fırlatabilirsiniz
                        throw new Error_1.AppError(400, 'User creation failed');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getUserById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findById(id)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error_1.AppError(404, 'User not found'); // İş mantığı hatası
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_2 = _a.sent();
                        // Repository hata mesajlarını değiştirmeyin
                        throw new Error_1.AppError(500, 'Error retrieving user by ID');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.getAllUser()];
                    case 1:
                        users = _a.sent();
                        if (users.length === 0) {
                            throw new Error_1.AppError(404, 'No users found'); // İş mantığı hatası
                        }
                        return [2 /*return*/, users];
                    case 2:
                        error_3 = _a.sent();
                        throw new Error_1.AppError(500, 'Error retrieving users');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getUserByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.userRepository.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error_1.AppError(404, 'User not found by email'); // İş mantığı hatası
                        }
                        return [2 /*return*/, user];
                    case 2:
                        error_4 = _a.sent();
                        throw new Error_1.AppError(500, 'Error retrieving user by email');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.updateUser = function (id, user) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    UserService.prototype.deleteUser = function (id) {
        throw new Error("Method not implemented.");
    };
    UserService.prototype.subscribeToUserCreated = function (callback) {
        this.emitter.subscribe('userCreated', callback);
    };
    UserService = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.UserRepository)),
        __param(1, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.TokenService)),
        __param(2, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.PasswordService)),
        __param(3, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.EventEmitter)),
        __metadata("design:paramtypes", [Object, Object, Object, Object])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=index.js.map