import { Injectable, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
    providedIn: 'root',
})
export class AppStorageService {
    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        await this.storage.defineDriver(CordovaSQLiteDriver);
        await this.storage.create();
    }

    public async setValue(key: string, value: string) {
        await this.storage.set(key, value);
    }

    public async getValue<T>(key: string): Promise<T> {
        return await this.storage.get(key);
    }
}
