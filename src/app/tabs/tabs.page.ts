import { Component } from '@angular/core';
import { getMinDate as currentDate } from 'src/utils/time-date.utils';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
    constructor() {}

    getMinDate() {
        return currentDate();
    }
}
