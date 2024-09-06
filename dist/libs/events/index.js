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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Emitter = void 0;
var events_1 = require("events");
var inversify_1 = require("inversify");
var instance = null;
var Emitter = /** @class */ (function () {
    function Emitter() {
        this.emitters = {};
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    Emitter.prototype.getEmitter = function (eventName) {
        if (!this.emitters[eventName]) {
            this.emitters[eventName] = new events_1.EventEmitter();
        }
        return this.emitters[eventName];
    };
    Emitter.prototype.publish = function (eventName, data) {
        var emitter = this.getEmitter(eventName);
        emitter.emit(eventName, data);
    };
    Emitter.prototype.subscribe = function (eventName, callback) {
        var emitter = this.getEmitter(eventName);
        emitter.on(eventName, callback);
    };
    Emitter = __decorate([
        (0, inversify_1.injectable)(),
        __metadata("design:paramtypes", [])
    ], Emitter);
    return Emitter;
}());
exports.Emitter = Emitter;
// @injectable()
// export class Emitter{
//     private emitters :{[key:string]:EventEmitter}={}
//     constructor(){
//         if(!instance){
//             instance=this
//         }
//         return instance
//     }
//      getEmitter(name: string): EventEmitter {
//         if (!this.emitters[name]) {
//             this.emitters[name] = new EventEmitter();
//         }
//         return this.emitters[name];
//     }
//      publish(event: string, data: any) {
//         const emitter = this.getEmitter(event);
//         emitter.emit(event, data);
//     }
// }
//# sourceMappingURL=index.js.map