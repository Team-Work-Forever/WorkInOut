import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticsPage } from './statistics.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { StatisticsPageRoutingModule } from './statistics-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    StatisticsPageRoutingModule,
  ],
  declarations: [StatisticsPage],
})
export class StatisticsPageModule {}
