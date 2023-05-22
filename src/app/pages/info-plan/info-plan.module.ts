import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPlanPageRoutingModule } from './info-plan-routing.module';

import { InfoPlanPage } from './info-plan.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        InfoPlanPageRoutingModule,
        InfoPlanPage,
    ],
})
export class InfoPlanPageModule {}
