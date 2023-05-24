import { NgModule } from '@angular/core';
import { CardHintComponent } from './card-hint.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [IonicModule, CommonModule],
    declarations: [CardHintComponent],
    exports: [CardHintComponent],
})
export class CardHintModule {}
