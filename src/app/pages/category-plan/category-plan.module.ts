import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPlanPageRoutingModule } from './category-plan-routing.module';

import { CategoryPlanPage } from './category-plan.page';
import { WorkHeaderComponent } from 'src/app/components/work-header/work-header.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CategoryPlanPageRoutingModule,
        WorkHeaderComponent,
    ],
    declarations: [CategoryPlanPage],
})
export class CategoryPlanPageModule {}
