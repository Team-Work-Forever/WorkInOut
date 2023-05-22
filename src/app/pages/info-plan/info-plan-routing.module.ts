import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPlanPage } from './info-plan.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPlanPageRoutingModule {}
