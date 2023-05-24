import { Component, Input, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
    selector: 'schedual-notification',
    templateUrl: './schedual-notification.component.html',
    styleUrls: ['./schedual-notification.component.scss'],
})
export class SchedualNotificationComponent implements OnInit {
    constructor(public toastController: ToastController) {}

    @Input()
    public isSelected: boolean;

    @Input()
    public title: string = 'Plano 1';

    @Input()
    public startDate: string;

    @Input()
    public endDate: string;

    public icon: string;

    public color: string = 'black';

    ngOnInit(): void {
        this.toggleButton();
    }

    toggleButton() {
        this.isSelected = !this.isSelected;
        this.icon = !this.isSelected
            ? 'notifications'
            : 'notifications-outline';
        this.color = !this.isSelected ? 'lightblue' : 'black';
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
