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
exports.AuthService = void 0;
var inversify_1 = require("inversify");
var utils_1 = require("../../utils");
var Error_1 = require("../../utils/Error");
var AuthService = /** @class */ (function () {
    function AuthService(userRepository, tokenService, passwordService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordService = passwordService;
    }
    AuthService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isPasswordValid, accessToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findByEmail(email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error_1.AppError(404, 'User not found by email');
                        }
                        return [4 /*yield*/, this.passwordService.comparePassword(password, user.password)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) {
                            throw new Error_1.AppError(401, 'Invalid credentials');
                        }
                        return [4 /*yield*/, this.tokenService.generateAccessToken({ userId: user._id })];
                    case 3:
                        accessToken = _a.sent();
                        return [4 /*yield*/, this.tokenService.generateRefreshToken({ userId: user._id })];
                    case 4:
                        refreshToken = _a.sent();
                        return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
                }
            });
        });
    };
    AuthService.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, hashedPassword, createdUser, accessToken, refreshToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findByEmail(user.email)];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser) {
                            throw new Error_1.AppError(404, 'User not found by email');
                        }
                        return [4 /*yield*/, this.passwordService.hashPassword(user.password)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.userRepository.create({
                                username: user.username,
                                email: user.email,
                                password: hashedPassword,
                                first_name: user.first_name,
                                last_name: user.last_name
                            })];
                    case 3:
                        createdUser = _a.sent();
                        if (!createdUser) {
                            throw new Error_1.AppError(204, 'No Content');
                        }
                        return [4 /*yield*/, this.tokenService.generateAccessToken({ userId: createdUser._id })];
                    case 4:
                        accessToken = _a.sent();
                        return [4 /*yield*/, this.tokenService.generateRefreshToken({ userId: createdUser._id })];
                    case 5:
                        refreshToken = _a.sent();
                        return [2 /*return*/, { accessToken: accessToken, refreshToken: refreshToken }];
                }
            });
        });
    };
    AuthService.prototype.logout = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Method not implemented.");
            });
        });
    };
    AuthService.prototype.refreshAccessToken = function (refreshToken) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded, user, accessToken, newRefreshToken, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.tokenService.verifyRefreshToken(refreshToken)];
                    case 1:
                        decoded = _a.sent();
                        if (!decoded || !decoded.userId) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userRepository.findById(decoded.userId)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.tokenService.generateAccessToken({ userId: user._id })];
                    case 3:
                        accessToken = _a.sent();
                        return [4 /*yield*/, this.tokenService.generateRefreshToken({ userId: user._id })];
                    case 4:
                        newRefreshToken = _a.sent();
                        return [2 /*return*/, { accessToken: accessToken, refreshToken: newRefreshToken }];
                    case 5:
                        error_1 = _a.sent();
                        console.log("Refresh Token Error: ", error_1);
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyTokenAndGetUser = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var decoded, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenService.verifyAccessToken(token)];
                    case 1:
                        decoded = _a.sent();
                        if (!decoded) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, this.userRepository.findById(decoded.userId)];
                    case 2:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, inversify_1.injectable)(),
        __param(0, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.UserRepository)),
        __param(1, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.TokenService)),
        __param(2, (0, inversify_1.inject)(utils_1.INTERFACE_TYPE.PasswordService)),
        __metadata("design:paramtypes", [Object, Object, Object])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=index.js.map