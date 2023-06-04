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

    /**
     * Get All Messages from an json file, and set the messagens globally
     */
    public async initializeMessageContext() {
        const data = await fetch(this.STANDARD_ERROR_NOTIFICATION);
        this.messages = await data.json();
    }

    /**
     * Get the Global Messages
     * @returns Message
     */
    public getMessages(): Message {
        return this.messages.objects;
    }
}
