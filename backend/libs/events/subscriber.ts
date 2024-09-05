import { injectable, inject } from 'inversify';
import { Emitter } from './';

@injectable()
export class SubscriberService {
    private emitter: Emitter
    constructor(
        @inject(Emitter) emitter: Emitter
    ) {}

    subscribe(eventName: string, callback: (data: any) => void) {
        const eventEmitter = this.emitter.getEmitter(eventName);
        eventEmitter.on(eventName, callback);
        console.log(`Subscribed to event: ${eventName}`);
    }
}