import { NgModule } from '@angular/core';
import { CardComponent } from './card.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [CardComponent],
    exports: [CardComponent],
})
export class CardModule {}
