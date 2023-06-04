import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification as Notify } from '../../models/notification.model';
import { getMinDate as currentDate } from 'src/utils/time-date.utils';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'schedual-selection',
    templateUrl: './schedual-selection.component.html',
    styleUrls: ['./schedual-selection.component.scss'],
})
export class SchedualSelectionComponent {
    @Input()
    plan: Plan;

    isSelectedDate: boolean;
    selectedDate: string;

    constructor(
        private modalCtrl: ModalController,
        public toastService: ToastService,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    /**
     * Close the modal
     * @returns
     */
    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

    /**
     * When is selected a date on the model and then confirm, the schedule date is stored
     * @returns
     */
    async confirm() {
        if (!this.isSelectedDate) {
            return;
        }
        await this.notificationService.addNotification({
            user_id: this.authenticationService.getAuthUser().userId,
            title: this.plan.title,
            type: 0,
            is_active: false,
            ended_at: this.selectedDate,
        } as Notify);

        await this.closeModal('confirm');

        this.router.navigate([
            '/tabs/schedule/' + JSON.stringify(this.selectedDate),
        ]);
    }

    /**
     * Get the current date to be the minimum date on the schedule
     * @returns
     */
    getMinDate() {
        return currentDate();
    }

    /**
     * Close the modal
     * @param result
     */
    async closeModal(result?: string) {
        await this.modalCtrl.dismiss(result);
    }

    /**
     * Collect the selected date
     * @param event
     */
    getSelectedDate(event) {
        const selectedDateTime = event.detail.value;
        this.isSelectedDate = true;
        this.selectedDate = selectedDateTime;
    }

    /**
     * Present a notification
     * @param position
     * @param title
     */
    async presentToast(position, title) {
        await this.toastService.showToast(title, position);
    }
}
