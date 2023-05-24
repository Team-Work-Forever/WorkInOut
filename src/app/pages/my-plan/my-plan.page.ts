import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { CardModule } from 'src/app/components/card/card.components.module';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { HorizontalSliderModule } from 'src/app/components/horizontal-slider/horizontal-slider.module';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { Card } from 'src/app/interfaces/card.inteface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { CategoryService } from 'src/app/services/category.service';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-my-plan',
    templateUrl: './my-plan.page.html',
    styleUrls: ['./my-plan.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        WorkHeaderModule,
        CardModule,
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
        private categoryService: CategoryService,
        private planService: PlanService,
        private router: Router
    ) {}

    async ngOnInit() {
        const categories = await this.categoryService.getAllCategories();

        const plans = await this.planService.getAllPlanOfUser({
            userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
            email: '',
        });

        console.log(plans);

        this.cards = plans.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                image: plan.badge,
                time: plan.duration.toString(),
                isFavorite: plan.is_favourite,
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

    createPlan() {
        this.router.navigate(['/tabs/home/mine/create']);
    }

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }
}
