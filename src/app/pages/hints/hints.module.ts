import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HintsPageRoutingModule } from './hints-routing.module';

import { HintsPage } from './hints.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HintsPageRoutingModule
  ],
  declarations: [HintsPage]
})
export class HintsPageModule {}
