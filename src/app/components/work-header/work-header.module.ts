import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { WorkHeaderComponent } from './work-header.component';
import { TextFieldModule } from '../text-field/text-field.module';

@NgModule({
    declarations: [WorkHeaderComponent],
    exports: [WorkHeaderComponent],
    imports: [CommonModule, IonicModule, FormsModule, TextFieldModule],
})
export class WorkHeaderModule {}
