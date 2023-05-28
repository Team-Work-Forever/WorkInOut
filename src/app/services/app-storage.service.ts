import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { getTheme } from 'src/utils/theme.utils';

@Injectable({
    providedIn: 'root',
})
export class AppStorageService {
    constructor(private storage: Storage) {
        this.init();
    }

    async init() {
        // await this.storage.defineDriver(CordovaSQLiteDriver);
        // const storage = await this.storage.create();
        // const theme = (await storage.get('theme')) as boolean;
        // document.body.setAttribute('color-theme', getTheme(theme));
    }

    public async setValue(key: string, value: string) {
        await this.storage.set(key, value);
    }

    public async getValue<T>(key: string): Promise<T> {
        return await this.storage.get(key);
    }
}
