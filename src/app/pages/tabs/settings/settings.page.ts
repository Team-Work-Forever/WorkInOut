import { Component, OnInit } from '@angular/core';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { getTheme } from 'src/utils/theme.utils';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ViewWillEnter {
    public value: boolean;

    constructor(private appStorage: AppStorageService) {}

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        const theme = (await this.appStorage.getValue('theme')) as boolean;

        if (theme) {
            this.value = theme;
        }
    }

    ngOnInit() {}

    onToggleColorTheme(event) {
        document.body.setAttribute(
            'color-theme',
            getTheme(event.detail.checked)
        );
        this.appStorage.setValue('theme', event.detail.checked);
    }
}
