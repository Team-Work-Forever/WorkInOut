import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-hint-modal',
    templateUrl: './hint-modal.component.html',
    styleUrls: ['./hint-modal.component.scss'],
})
export class HintModalComponent implements OnInit {
    @Input()
    description: string;

    constructor(private modalCtrl: ModalController) {}

    ngOnInit() {}

    /**
     * Cancel the Modal
     * @returns
     */
    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }

    /**
     * Close the modal with a result
     * @param result
     */
    async closeModal(result?: string) {
        await this.modalCtrl.dismiss(result);
    }
}
