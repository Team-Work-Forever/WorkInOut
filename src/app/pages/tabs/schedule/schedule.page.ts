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
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    /**
     * Active or disable notification of plan
     * @param event
     */
    handleNotification(event) {
        this.notificationService.switchNotification(event.id, event.isActive);
    }

    /**
     * Get the current date to be the minimum date on the schedule
     * @returns
     */
    getMinDate() {
        return currentDate();
    }

    /**
     * Get all plans schedule to the day selected
     * @param event
     */
    async getSelectedDate(event) {
        const selectedDateTime = event.detail.value;
        const selectedDate = selectedDateTime.split('T')[0];

        // Get all notifications from the user
        const notifications =
            await this.notificationService.getAllMyNotifications(
                this.authenticationService.getAuthUser(),
                selectedDate
            );

        // Define Notifications
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
