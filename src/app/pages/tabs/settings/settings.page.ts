import { Component, OnInit } from '@angular/core';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ViewWillEnter {
    constructor() {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    ngOnInit() {}

    onToggleColorTheme(event) {
        const theme = event.detail.checked ? 'dark' : 'light';
        document.body.setAttribute('color-theme', theme);
    }
}
