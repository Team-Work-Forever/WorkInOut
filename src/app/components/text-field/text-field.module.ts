import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TextFieldComponent } from './text-field.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, IonicModule, FormsModule],
    declarations: [TextFieldComponent],
    exports: [TextFieldComponent],
})
export class TextFieldModule {}
