"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketContainer = void 0;
var inversify_1 = require("inversify");
var socketChat_1 = require("../../libs/socketChat");
var utils_1 = require("../../utils");
var socketContainer = new inversify_1.Container();
exports.socketContainer = socketContainer;
socketContainer.bind(utils_1.INTERFACE_TYPE.SocketChat).to(socketChat_1.SocketChat);
//# sourceMappingURL=index.js.map