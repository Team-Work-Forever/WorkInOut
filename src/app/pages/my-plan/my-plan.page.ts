import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { IonicModule, NavController, ViewWillEnter } from '@ionic/angular';
import { CardModule } from 'src/app/components/card/card.components.module';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { HorizontalSliderModule } from 'src/app/components/horizontal-slider/horizontal-slider.module';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { Card } from 'src/app/interfaces/card.inteface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
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
export class MyPlanPage implements ViewWillEnter {
    results: Card[];
    cards: Card[];

    categories: HorizontalItem[] = [];

    constructor(
        private nav: NavController,
        private categoryService: CategoryService,
        private planService: PlanService,
        private router: Router
    ) {}

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        const categories = await this.categoryService.getAllCategories();

        const plans = await this.planService.getAllPlanOfUser({
            userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
            email: '',
        });

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
        this.router.navigate(['/tabs/home/mine/create/nocontent']);
    }

    async selectionChanged({ id, image, isFavorite, time, title }: Card) {
        await this.planService.changeFav(
            {
                id: id,
                is_favourite: isFavorite,
                badge: image,
                title: title,
                duration: parseFloat(time),
            } as Plan,
            { userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f' } as User
        );
    }

    handleClick(card: Card) {
        this.router.navigate(['/tabs/home/info/' + card.id]);
    }
}
