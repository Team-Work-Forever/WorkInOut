import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPlanPage } from './category-plan.page';
import { WorkHeaderComponent } from 'src/app/components/work-header/work-header.component';

const routes: Routes = [
    {
        path: '',
        component: CategoryPlanPage,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CategoryPlanPageRoutingModule {}
