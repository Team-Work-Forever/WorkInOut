import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt-PT';

import { register } from 'swiper/element/bundle';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { AuthGuard } from './core/guard/auth.guard';
import { getTheme } from 'src/utils/theme.utils';
import { AppStorageService } from './services/app-storage.service';
import { MessageManagerService } from './services/message-manager.service';

registerLocaleData(localePt);
register();

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        IonicStorageModule.forRoot({
            driverOrder: [
                CordovaSQLiteDriver._driver,
                Drivers.IndexedDB,
                Drivers.LocalStorage,
            ],
        }),
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AuthGuard,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor(
        private _storage: AppStorageService,
        private _messageManager: MessageManagerService
    ) {
        this.init().then();
    }

    async init() {
        const storage = await this._storage.initializeStorage();

        const theme = (await storage.get('theme')) as boolean;
        document.body.setAttribute('color-theme', getTheme(theme));

        this._messageManager.initializeMessageContext();
    }
}
