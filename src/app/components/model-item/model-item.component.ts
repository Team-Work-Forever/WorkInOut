import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Material } from 'src/app/interfaces/imageContent.interface';

@Component({
    selector: 'model-item',
    templateUrl: './model-item.component.html',
    styleUrls: ['./model-item.component.scss'],
})
export class ModelItemComponent implements OnInit {
    @Input()
    public materials: Material[];

    constructor(private modalCtrl: ModalController) {}

    ngOnInit() {}

    /**
     * Close the Modal
     * @returns
     */
    cancel() {
        return this.modalCtrl.dismiss(null, 'cancel');
    }
}
