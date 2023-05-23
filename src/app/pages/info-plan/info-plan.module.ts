import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPlanPageRoutingModule } from './info-plan-routing.module';

import { InfoPlanPage } from './info-plan.page';
import { SchedualSelectionModule } from 'src/app/components/schedule-selection/schedual-selection.module';
import { ModelItemModule } from 'src/app/components/model-item/model-item.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InfoPlanPageRoutingModule,
        InfoPlanPage,
        SchedualSelectionModule,
        ModelItemModule,
    ],
})
export class InfoPlanPageModule {}
