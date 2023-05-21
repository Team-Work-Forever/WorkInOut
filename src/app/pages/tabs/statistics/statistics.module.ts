import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticsPage } from './statistics.page';

import { StatisticsPageRoutingModule } from './statistics-routing.module';
import { WorkHeaderComponent } from 'src/app/components/work-header/work-header.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        StatisticsPageRoutingModule,
        WorkHeaderComponent,
    ],
    declarations: [StatisticsPage],
})
export class StatisticsPageModule {}
