import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification as Notify } from '../../models/notification.model';
import { getMinDate as currentDate } from 'src/utils/time-date.utils';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

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
        public toastController: ToastController,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

    async confirm() {
        if (!this.isSelectedDate) {
            // Se nenhuma data foi selecionada, exiba uma mensagem de erro ou realize a ação adequada.
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

    getMinDate() {
        return currentDate();
    }

    async closeModal(result?: string) {
        await this.modalCtrl.dismiss(result);
    }

    getSelectedDate(event) {
        const selectedDateTime = event.detail.value;
        this.isSelectedDate = true;
        this.selectedDate = selectedDateTime;
    }

    async presentToast(position, title) {
        const toast = await this.toastController.create({
            message: title,
            duration: 2000,
            position: position,
        });
        toast.present();
    }
}
