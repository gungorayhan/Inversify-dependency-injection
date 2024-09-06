"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToUserDatabase = void 0;
exports.connectToDatabases = connectToDatabases;
exports.closeConnections = closeConnections;
exports.getDatabaseConnection = getDatabaseConnection;
var user_1 = require("./user");
Object.defineProperty(exports, "connectToUserDatabase", { enumerable: true, get: function () { return user_1.connectToUserDatabase; } });
var mongoose_1 = __importDefault(require("mongoose"));
var config_1 = __importDefault(require("../config"));
var connections = {};
function connectToDatabases() {
    return __awaiter(this, void 0, void 0, function () {
        var _loop_1, _i, _a, _b, dbName, uri;
        return __generator(this, function (_c) {
            _loop_1 = function (dbName, uri) {
                if (!connections[dbName]) {
                    try {
                        var connection = mongoose_1.default.createConnection(uri, {
                            useNewUrlParser: true,
                            useUnifiedTopology: true
                        });
                        connection.on('open', function () {
                            console.log("Connected to ".concat(dbName));
                        });
                        connection.on('error', function (error) {
                            console.error("Failed to connect to ".concat(dbName, ":"), error);
                        });
                        connections[dbName] = connection;
                    }
                    catch (error) {
                        console.error("Failed to connect to ".concat(dbName, ":"), error);
                        throw error;
                    }
                }
            };
            for (_i = 0, _a = Object.entries(config_1.default.DatabaseURL); _i < _a.length; _i++) {
                _b = _a[_i], dbName = _b[0], uri = _b[1];
                _loop_1(dbName, uri);
            }
            return [2 /*return*/];
        });
    });
}
function closeConnections() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, _b, dbName, connection, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _i = 0, _a = Object.entries(connections);
                    _c.label = 1;
                case 1:
                    if (!(_i < _a.length)) return [3 /*break*/, 6];
                    _b = _a[_i], dbName = _b[0], connection = _b[1];
                    if (!(connection.readyState === 1)) return [3 /*break*/, 5];
                    _c.label = 2;
                case 2:
                    _c.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, connection.close()];
                case 3:
                    _c.sent();
                    console.log("Connection to ".concat(dbName, " closed successfully."));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    console.error("Failed to close connection to ".concat(dbName, ":"), error_1);
                    return [3 /*break*/, 5];
                case 5:
                    _i++;
                    return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function getDatabaseConnection(dbName) {
    var connection = connections[dbName];
    if (!connection) {
        throw new Error("No connection found for database: ".concat(dbName));
    }
    return connection;
}
//# sourceMappingURL=index.js.map