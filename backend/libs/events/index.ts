import { EventEmitter } from "events";
import { injectable } from "inversify";
import { IEventEmitter } from "../../interfaces";

let instance: Emitter | null = null

@injectable()
export class Emitter implements IEventEmitter {
    constructor() {
        if (!instance) {
            instance = this
        }

        return instance
    }
    private emitters: { [key: string]: EventEmitter } = {};

    getEmitter(eventName: string): EventEmitter {
        if (!this.emitters[eventName]) {
            this.emitters[eventName] = new EventEmitter();
        }
        return this.emitters[eventName];
    }

    publish(eventName: string, data: any) {
        const emitter = this.getEmitter(eventName);
        emitter.emit(eventName, data);
    }

    subscribe(eventName: string, callback: (data: any) => void) {
        const emitter = this.getEmitter(eventName);
        emitter.on(eventName, callback);
    }
}



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

