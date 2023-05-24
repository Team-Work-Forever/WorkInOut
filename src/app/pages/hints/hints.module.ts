import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HintsPageRoutingModule } from './hints-routing.module';

import { HintsPage } from './hints.page';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { CardHintModule } from 'src/app/components/card-hint/card-hint.components.module';
import { HintModalModule } from 'src/app/components/hint-modal/hint-modal.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HintsPageRoutingModule,
        WorkHeaderModule,
        CardHintModule,
        HintModalModule,
    ],
    declarations: [HintsPage],
})
export class HintsPageModule {}
