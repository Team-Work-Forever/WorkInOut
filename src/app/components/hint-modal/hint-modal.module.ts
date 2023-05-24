import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { HintModalComponent } from './hint-modal.component';

@NgModule({
    declarations: [HintModalComponent],
    exports: [HintModalComponent],
    imports: [CommonModule, IonicModule],
})
export class HintModalModule {}
