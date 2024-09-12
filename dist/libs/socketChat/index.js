"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketChat = void 0;
var inversify_1 = require("inversify");
var socket_io_1 = require("socket.io");
var SocketChat = /** @class */ (function () {
    function SocketChat() {
    }
    SocketChat.prototype.initialize = function (server) {
        this.io = new socket_io_1.Server(server, {
            cors: {
                origin: "*",
            }
        });
        this.io.on("connection", function (socket) {
            console.log("A user connected:", socket.id);
            socket.on('joinRoom', function (room) {
                socket.join(room);
                console.log("User joined room: ".concat(room));
            });
            socket.on("message", function (data) {
                console.log("Message received: ", data.message);
                socket.to(data.room).emit("response", "Message received!");
            });
            socket.on("disconnect", function () {
                console.log("A user disconnect", socket.id);
            });
        });
    };
    SocketChat.prototype.sendMessageToClient = function (clientId, message) {
        var socket = this.io.sockets.sockets.get(clientId);
        if (socket) {
            socket.emit("customMessage", message);
        }
    };
    SocketChat = __decorate([
        (0, inversify_1.injectable)()
    ], SocketChat);
    return SocketChat;
}());
exports.SocketChat = SocketChat;
//# sourceMappingURL=index.js.map