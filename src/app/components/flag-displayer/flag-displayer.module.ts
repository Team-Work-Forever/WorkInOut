import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagDisplayerComponent } from './flag-displayer.component';

@NgModule({
    declarations: [FlagDisplayerComponent],
    exports: [FlagDisplayerComponent],
    imports: [CommonModule],
})
export class FlagDisplayerModule {}
