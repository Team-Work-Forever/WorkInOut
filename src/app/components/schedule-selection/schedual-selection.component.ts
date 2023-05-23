import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'schedual-selection',
    templateUrl: './schedual-selection.component.html',
    styleUrls: ['./schedual-selection.component.scss'],
})
export class SchedualSelectionComponent {
    constructor(private modalCtrl: ModalController) {}

    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

    confirm() {
        return this.modalCtrl.dismiss('confirm');
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

        // Agora você tem todas as partes da data e da hora separadas.
        // Você pode usá-las para realizar as ações necessárias.
        console.log('Ano:', year);
        console.log('Mês:', month);
        console.log('Dia:', day);
        console.log('Hora:', hour);
        console.log('Minutos:', minute);
    }
}
