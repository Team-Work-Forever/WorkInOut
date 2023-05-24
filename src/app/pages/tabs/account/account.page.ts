import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit, ViewWillEnter {
    constructor(private router: Router) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    ngOnInit() {}

    goToHints() {
        this.router.navigate(['tabs/account/hints']);
    }
}
