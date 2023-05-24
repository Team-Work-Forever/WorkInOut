import { Component } from '@angular/core';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';

@Component({
    selector: 'app-statistics',
    templateUrl: 'statistics.page.html',
    styleUrls: ['statistics.page.scss'],
})
export class StatisticsPage implements ViewWillEnter {
    constructor() {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }
}
