import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
    providedIn: 'root',
})
export class AppStorageService {
    constructor(private storage: Storage) {}

    /**
     * Create a new storage with CordovaSQLiteDriver
     * @returns Promise\<Storage\> a new instance of Storage
     */
    public async initializeStorage(): Promise<Storage> {
        await this.storage.defineDriver(CordovaSQLiteDriver);
        return await this.storage.create();
    }

    /**
     * Get the value of an given key
     * @param key
     * @param value
     */
    public async setValue(key: string, value: string) {
        await this.storage.set(key, value);
    }

    /**
     * Remove an value of an given key
     * @param key
     */
    public async removeValue(key: string) {
        await this.storage.remove(key);
    }

    /**
     * Get an value of a given key
     * @param key
     * @returns Promise\<T\> value of type T
     */
    public async getValue<T>(key: string): Promise<T> {
        return await this.storage.get(key);
    }
}
