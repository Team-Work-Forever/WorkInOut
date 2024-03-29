import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root',
})
export class ToastService {
    constructor(private toastController: ToastController) {}

    /**
     * Create an notification toast
     * @param title
     * @param position top | middle | bottom
     * @param duration
     */
    public async showToast(
        title: string,
        position: 'top' | 'middle' | 'bottom' = 'top',
        duration: number = 2000
    ) {
        const toast = await this.toastController.create({
            message: title,
            duration: duration,
            position: position,
        });

        toast.present();
    }
}
