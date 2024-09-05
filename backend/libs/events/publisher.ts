import { injectable, inject } from 'inversify';
import { Emitter } from './';
import { INTERFACE_TYPE } from '../../utils';

@injectable()
export class PublisherService {
    private emitter: Emitter
    constructor(
        @inject(INTERFACE_TYPE.EventEmitter) emitter: Emitter
    ) {}

    publishEvent(eventName: string, data: any) {
        this.emitter.publish(eventName, data);
        console.log(`Event ${eventName} published with data:`, data);
    }
}