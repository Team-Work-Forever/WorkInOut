import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HintsPage } from './hints.page';

const routes: Routes = [
  {
    path: '',
    component: HintsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HintsPageRoutingModule {}
