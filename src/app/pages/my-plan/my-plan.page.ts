import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CardComponent } from 'src/app/components/card/card.component';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { HorizontalSliderModule } from 'src/app/components/horizontal-slider/horizontal-slider.module';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { Card } from 'src/app/interfaces/card.inteface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { CategoryService } from 'src/app/services/category.service';
import { PlanService } from 'src/app/services/plan.service';

@Component({
    selector: 'app-my-plan',
    templateUrl: './my-plan.page.html',
    styleUrls: ['./my-plan.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        WorkHeaderModule,
        CardComponent,
        HorizontalSliderModule,
        CheckButtonModule,
    ],
})
export class MyPlanPage implements OnInit {
    results: Card[];
    cards: Card[];

    categories: HorizontalItem[] = [];

    constructor(
        private nav: NavController,
        private planService: PlanService,
        private categoryService: CategoryService
    ) {}

    async ngOnInit() {
        const categories = await this.categoryService.getAllCategories();
        const plans = await this.planService.getAllPlans();

        this.cards = plans.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                time: plan.duration.toString(),
            } as Card;
        });

        this.categories = categories.map((cat) => {
            return {
                title: cat.title,
                color: cat.color,
            } as HorizontalItem;
        });

        this.results = this.cards;
    }

    handleResult(filteredResults: Card[]) {
        this.results = filteredResults;
    }

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }
}
