import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonBackButton, IonicModule, ViewWillEnter } from '@ionic/angular';
import { SwiperModule } from 'src/app/components/swiper/swiper.module';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { Card } from 'src/app/interfaces/card.inteface';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { FlatButtonModule } from 'src/app/components/flat-button/flat-button.module';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanService } from 'src/app/services/plan-service.service';
import { Plan } from 'src/app/models/plan.model';
import { CardModule } from 'src/app/components/card/card.components.module';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        SwiperModule,
        WorkHeaderModule,
        CheckButtonModule,
        CardModule,
        FlatButtonModule,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit, ViewWillEnter {
    isLoading: boolean = false;

    maxCardsPerRow: number;
    cards: Card[] = [];
    planFav: Card[] = [];
    planRec: Card[] = [];
    planPop: Card[] = [];

    results: Card[];

    constructor(
        private authService: AuthenticationService,
        private planService: PlanService,
        private router: Router
    ) {}

    async ionViewWillEnter() {
        IonBackButton['defaultHref'] = '';

        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Present the symbol of loading
        this.isLoading = true;

        // Get all favorite plans from the user
        const fav_plan = await this.planService.getAllPlanOfUserFavorite(
            this.authService.getAuthUser()
        );

        // Get all Recommended e Popular Plans
        const rec_plan = await this.planService.getAllRecomendedPlan();
        const pop_plan = await this.planService.getAllPopularPlan();

        // Define the plans of all swipes
        this.planFav = fav_plan.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                time: plan.duration,
                isFavorite: plan.is_favourite,
                image: plan.badge,
            } as Card;
        });

        this.planRec = rec_plan.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                time: plan.duration,
                isFavorite: plan.is_favourite,
                image: plan.badge,
            } as Card;
        });

        this.planPop = pop_plan.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                time: plan.duration,
                isFavorite: plan.is_favourite,
                image: plan.badge,
            } as Card;
        });
        this.handleChangeIndex(0);

        // End the loading
        this.isLoading = false;
    }

    ngOnInit() {
        this.calculateMaxCardsPerRow();
    }

    /**
     * Change cards and title on swipe
     * @param event
     */
    handleChangeIndex(event: number) {
        switch (event) {
            case 0:
                this.cards = this.planFav;
                break;
            case 1:
                this.cards = this.planRec;
                break;
            case 2:
                this.cards = this.planPop;
                break;
        }

        this.results = this.cards;
    }

    /**
     * Make the results be the plans filtered
     * @param filteredResults
     */
    handleResult(filteredResults: Card[]) {
        this.results = filteredResults;
    }

    /**
     * Navigate to my plans
     */
    goToMyPlans() {
        this.router.navigate(['/tabs/home/mine']);
    }

    /**
     * Navigate to categories
     */
    goToPlans() {
        this.router.navigate(['/tabs/home/category']);
    }

    /**
     * Navigate to info of plan selected
     * @param event
     */
    handleClick(event: Card) {
        this.router.navigate(['/tabs/home/info/' + event.id]);
    }

    /**
     * If plan became favorite or not
     * @param event
     */
    selectionChanged(event: Card) {
        this.planService.changeFav(
            {
                id: event.id,
                is_favourite: event.isFavorite,
            } as Plan,
            this.authService.getAuthUser()
        );
    }

    /**
     * Calculate the maximum number of cards in a row
     */
    calculateMaxCardsPerRow(): void {
        const cardWidth = 164;
        const margin = 10;
        const gap = 2;

        const containerWidth =
            document.querySelector('.card-row')?.clientWidth ?? 0;
        const availableWidth = containerWidth - margin * 2;
        const maxCards = Math.floor(availableWidth / (cardWidth + gap));
        this.maxCardsPerRow = Math.max(1, maxCards);
    }
}
