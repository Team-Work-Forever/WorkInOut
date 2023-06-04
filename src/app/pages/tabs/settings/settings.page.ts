import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { AppStorageService } from 'src/app/services/app-storage.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { getTheme } from 'src/utils/theme.utils';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, ViewWillEnter {
    public value: boolean;

    constructor(
        private appStorage: AppStorageService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    async ionViewWillEnter() {
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Collect a boolean of the stored theme
        const theme = (await this.appStorage.getValue('theme')) as boolean;

        // Define the theme of the application the theme stored
        if (theme) {
            this.value = theme;
        }
    }

    ngOnInit() {}

    /**
     * Change color theme (light mode or dark mode)
     * @param event
     */
    onToggleColorTheme(event) {
        document.body.setAttribute(
            'color-theme',
            getTheme(event.detail.checked)
        );
        this.appStorage.setValue('theme', event.detail.checked);
    }

    /**
     * Finish user session
     */
    async logOut() {
        await this.authenticationService.logOut();
        this.router.navigate(['/tabs/settings'], {
            onSameUrlNavigation: 'reload',
        });
    }
}
