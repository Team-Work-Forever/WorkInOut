import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification as Notify } from '../../models/notification.model';
import { convertToYearMonthDay } from 'src/utils/time-date.utils';

@Component({
    selector: 'schedual-selection',
    templateUrl: './schedual-selection.component.html',
    styleUrls: ['./schedual-selection.component.scss'],
})
export class SchedualSelectionComponent {
    isSelectedDate: boolean;
    selectedDate: string;

    constructor(
        private modalCtrl: ModalController,
        public toastController: ToastController,
        private notificationService: NotificationService
    ) {}

    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

    async confirm() {
        if (!this.isSelectedDate) {
            // Se nenhuma data foi selecionada, exiba uma mensagem de erro ou realize a ação adequada.
            console.log('Selecione uma data para agendar o plano');
            return;
        }

        await this.notificationService.addNotification({
            user_id: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
            title: 'Eueu',
            type: 0,
            is_active: false,
            ended_at: this.selectedDate,
        } as Notify);

        await this.closeModal('confirm');
    }

    async closeModal(result?: string) {
        await this.modalCtrl.dismiss(result);
    }

    getMinDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}T00:00:00`;
        return minDate;
    }

    getSelectedDate(event) {
        const selectedDateTime = event.detail.value;
        this.isSelectedDate = true;
        this.selectedDate = selectedDateTime;
        console.log(selectedDateTime);
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
