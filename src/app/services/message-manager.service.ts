import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message.interface';

@Injectable({
    providedIn: 'root',
})
export class MessageManagerService {
    private messages: any;
    private readonly STANDARD_ERROR_NOTIFICATION: string =
        './assets/data/standardErrorNotification.json';

    constructor() {}

    public async initializeMessageContext() {
        const data = await fetch(this.STANDARD_ERROR_NOTIFICATION);
        this.messages = await data.json();
    }

    public getMessages(): Message {
        return this.messages.objects;
    }
}
