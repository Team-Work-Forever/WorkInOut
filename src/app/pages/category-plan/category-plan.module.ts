import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPlanPageRoutingModule } from './category-plan-routing.module';

import { CategoryPlanPage } from './category-plan.page';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { CardComponent } from 'src/app/components/card/card.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CategoryPlanPageRoutingModule,
        WorkHeaderModule,
        CardComponent,
    ],
    declarations: [CategoryPlanPage],
})
export class CategoryPlanPageModule {}
