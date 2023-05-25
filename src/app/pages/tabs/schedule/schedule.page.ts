import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { NotificationItem } from 'src/app/interfaces/notification-item.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotificationService } from 'src/app/services/notification.service';
import {
    convertToHoursMinutes,
    getMinDate as currentDate,
} from 'src/utils/time-date.utils';

@Component({
    selector: 'app-schedule',
    templateUrl: 'schedule.page.html',
    styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements ViewWillEnter {
    public notifications: NotificationItem[];
    public tabDate: string;

    constructor(
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        private activeRoute: ActivatedRoute
    ) {}

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        const info = this.activeRoute.snapshot.paramMap.get('date');

        const date = info ? (JSON.parse(info) as string) : '';
    }

    handleNotification(event) {
        this.notificationService.switchNotification(event.id, event.isActive);
    }

    getMinDate() {
        return currentDate();
    }

    getDateFromTab(): string {
        return this.tabDate || this.getMinDate();
    }

    async getSelectedDate(event) {
        const selectedDateTime = event.detail.value;
        const selectedDate = selectedDateTime.split('T')[0]; // Extrair a parte da data

        const notifications =
            await this.notificationService.getAllMyNotifications(
                this.authenticationService.getAuthUser(),
                selectedDate
            );

        this.notifications = notifications.map((notification) => {
            return {
                id: notification.id,
                title: notification.title,
                type: notification.type,
                started_at: convertToHoursMinutes(notification.started_at),
                ended_at: convertToHoursMinutes(notification.ended_at),
                is_active: notification.is_active,
            } as NotificationItem;
        });
    }
}
