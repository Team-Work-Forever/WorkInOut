import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HintsPageRoutingModule } from './hints-routing.module';

import { HintsPage } from './hints.page';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { CardModule } from 'src/app/components/card/card.components.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HintsPageRoutingModule,
        WorkHeaderModule,
        CardModule,
    ],
    declarations: [HintsPage],
})
export class HintsPageModule {}
