import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlayPlanPage } from './play-plan.page';

const routes: Routes = [
  {
    path: '',
    component: PlayPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayPlanPageRoutingModule {}
