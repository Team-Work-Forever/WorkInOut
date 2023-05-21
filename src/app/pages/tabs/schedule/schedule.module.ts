import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchedulePage } from './schedule.page';

import { SchedulePageRoutingModule } from './schedule-routing.module';
import { WorkHeaderComponent } from 'src/app/components/work-header/work-header.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        SchedulePageRoutingModule,
        WorkHeaderComponent,
    ],
    declarations: [SchedulePage],
})
export class SchedulePageModule {}
