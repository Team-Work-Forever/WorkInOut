import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlayPlanPageRoutingModule } from './play-plan-routing.module';

import { PlayPlanPage } from './play-plan.page';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { FlagDisplayerModule } from 'src/app/components/flag-displayer/flag-displayer.module';
import { ItemVisualizerModule } from 'src/app/components/item-visualizer/item-visualizer.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PlayPlanPageRoutingModule,
        WorkHeaderModule,
        FlagDisplayerModule,
        ItemVisualizerModule,
    ],
    declarations: [PlayPlanPage],
})
export class PlayPlanPageModule {}
