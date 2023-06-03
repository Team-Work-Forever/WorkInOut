import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { CardModule } from 'src/app/components/card/card.components.module';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { HorizontalSliderModule } from 'src/app/components/horizontal-slider/horizontal-slider.module';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { Card } from 'src/app/interfaces/card.inteface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { Plan } from 'src/app/models/plan.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
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
    public isLoading: boolean = true;

    results: Card[];
    cards: Card[];

    categories: HorizontalItem[] = [];

    constructor(
        private categoryService: CategoryService,
        private authenticationService: AuthenticationService,
        private planService: PlanService,
        private router: Router
    ) {}

    async ionViewWillEnter() {
        this.isLoading = true;

        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        const categories = await this.categoryService.getAllCategories();

        const plans = await this.planService.getAllPlanOfUser({
            userId: this.authenticationService.getAuthUser().userId,
            email: '',
        });

        this.cards = plans.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                image: plan.badge,
                time: plan.duration,
                isFavorite: plan.is_favourite,
            } as Card;
        });

        this.categories = categories.map((cat) => {
            return {
                id: cat.id,
                title: cat.title,
                color: cat.color,
            } as HorizontalItem;
        });

        this.isLoading = false;
    }

    /**
     * Make the results be the plans filtered
     * @param filteredResults
     */
    handleResult(filteredResults: Card[]) {
        this.results = filteredResults;
    }

    /**
     * Show plans by categories selected
     * @param selectedCategories
     * @returns
     */
    async selectedCategoriesChanged(selectedCategories: string[]) {
        const filteredPlans =
            await this.planService.getAllPlanOfUserFilterWithCategories(
                this.authenticationService.getAuthUser(),
                selectedCategories
            );

        if (selectedCategories.length === 0) {
            this.results = [];
            return;
        }

        this.results = filteredPlans.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                image: plan.badge,
                time: plan.duration,
                isFavorite: plan.is_favourite,
            } as Card;
        });
    }

    /**
     * Send the user to the create plan page
     */
    createPlan() {
        this.router.navigate(['/tabs/home/mine/create/nocontent']);
    }

    /**
     * If plan became favorite or not
     * @param param0
     */
    async selectionChanged({ id, image, isFavorite, time, title }: Card) {
        await this.planService.changeFav(
            {
                id: id,
                is_favourite: isFavorite,
                badge: image,
                title: title,
                duration: time,
            } as Plan,
            this.authenticationService.getAuthUser()
        );
    }

    /**
     * Navigate to the info page of the card selected
     * @param card
     */
    handleClick(card: Card) {
        this.router.navigate(['/tabs/home/info/' + card.id]);
    }
}
