import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlagDisplayerComponent } from './flag-displayer.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [FlagDisplayerComponent],
    exports: [FlagDisplayerComponent],
    imports: [CommonModule, IonicModule],
})
export class FlagDisplayerModule {}
