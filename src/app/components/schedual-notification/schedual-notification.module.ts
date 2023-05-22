import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedualNotificationComponent } from './schedual-notification.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [SchedualNotificationComponent],
    exports: [SchedualNotificationComponent],
    imports: [CommonModule, IonicModule],
})
export class SchedualNotificationModule {}
