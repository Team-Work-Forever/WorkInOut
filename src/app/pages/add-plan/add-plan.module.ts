import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlanPageRoutingModule } from './add-plan-routing.module';

import { AddPlanPage } from './add-plan.page';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { ReorderItemModule } from 'src/app/components/reorder-item/reorder-item.module';
import { HorizontalSliderModule } from 'src/app/components/horizontal-slider/horizontal-slider.module';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { FlagDisplayerModule } from 'src/app/components/flag-displayer/flag-displayer.module';
import { ExerciseModule } from 'src/app/components/exercise/exercise.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddPlanPageRoutingModule,
        WorkHeaderModule,
        ReorderItemModule,
        HorizontalSliderModule,
        CheckButtonModule,
        FlagDisplayerModule,
        ExerciseModule,
    ],
    declarations: [AddPlanPage],
})
export class AddPlanPageModule {}
