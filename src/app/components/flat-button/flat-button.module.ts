import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatButtonComponent } from './flat-button.component';

@NgModule({
    declarations: [FlatButtonComponent],
    exports: [FlatButtonComponent],
    imports: [CommonModule],
})
export class FlatButtonModule {}
