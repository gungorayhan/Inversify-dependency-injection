import EventEmitter from "events";

export interface IEventEmitter{
    getEmitter(eventName: string): EventEmitter
    publish(eventName: string, data: any): void
    subscribe(eventName: string, callback: (data: any) => void):void
}