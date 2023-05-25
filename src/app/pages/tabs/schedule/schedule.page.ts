import { Component, OnInit } from '@angular/core';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { NotificationItem } from 'src/app/interfaces/notification-item.interface';
import { User } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';
import {
    convertToHoursMinutes,
    convertToYearMonthDay,
} from 'src/utils/time-date.utils';

@Component({
    selector: 'app-schedule',
    templateUrl: 'schedule.page.html',
    styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements OnInit, ViewWillEnter {
    public notifications: NotificationItem[];

    constructor(private notificationService: NotificationService) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    async ngOnInit() {}

    handleNotification(event) {
        this.notificationService.switchNotification(event.id, event.isActive);
    }

    getMinDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}T00:00:00`;
        return minDate;
    }

    async getSelectedDate(event) {
        const selectedDateTime = event.detail.value;
        const selectedDate = selectedDateTime.split('T')[0]; // Extrair a parte da data

        const notifications =
            await this.notificationService.getAllMyNotifications(
                {
                    userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
                } as User,
                selectedDate
            );

        this.notifications = notifications.map((notification) => {
            console.log(this.notifications);
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
