import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
    selector: 'schedual-selection',
    templateUrl: './schedual-selection.component.html',
    styleUrls: ['./schedual-selection.component.scss'],
})
export class SchedualSelectionComponent {
    selectedDate: boolean;

    constructor(
        private modalCtrl: ModalController,
        public toastController: ToastController
    ) {}

    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

    async confirm() {
        if (!this.selectedDate) {
            // Se nenhuma data foi selecionada, exiba uma mensagem de erro ou realize a ação adequada.
            console.log('Selecione uma data para agendar o plano');
            return;
        }

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
        const dateTimeParts = selectedDateTime.split('T');
        const dateParts = dateTimeParts[0].split('-');
        const timeParts = dateTimeParts[1].split(':');

        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];
        const hour = timeParts[0];
        const minute = timeParts[1];

        this.selectedDate = true;

        // Agora você tem todas as partes da data e da hora separadas.
        // Você pode usá-las para realizar as ações necessárias.
        console.log('Ano:', year);
        console.log('Mês:', month);
        console.log('Dia:', day);
        console.log('Hora:', hour);
        console.log('Minutos:', minute);
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
