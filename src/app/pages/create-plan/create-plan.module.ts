import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePlanPageRoutingModule } from './create-plan-routing.module';

import { CreatePlanPage } from './create-plan.page';
import { TextFieldModule } from 'src/app/components/text-field/text-field.module';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { ReorderItemModule } from 'src/app/components/reorder-item/reorder-item.module';
import { FlagDisplayerModule } from 'src/app/components/flag-displayer/flag-displayer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CreatePlanPageRoutingModule,
        WorkHeaderModule,
        TextFieldModule,
        ReorderItemModule,
        FlagDisplayerModule,
    ],
    declarations: [CreatePlanPage],
})
export class CreatePlanPageModule {}
