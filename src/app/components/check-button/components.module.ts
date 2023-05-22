import { NgModule } from '@angular/core';
import { CheckButtonComponent } from './check-button.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [CheckButtonComponent],
    exports: [CheckButtonComponent],
})
export class CheckButtonModule {}
