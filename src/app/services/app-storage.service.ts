import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
    providedIn: 'root',
})
export class AppStorageService {
    constructor(private storage: Storage) {}

    public async initializeStorage(): Promise<Storage> {
        await this.storage.defineDriver(CordovaSQLiteDriver);
        return await this.storage.create();
    }

    public async setValue(key: string, value: string) {
        await this.storage.set(key, value);
    }

    public async removeValue(key: string) {
        await this.storage.remove(key);
    }

    public async getValue<T>(key: string): Promise<T> {
        return await this.storage.get(key);
    }
}
