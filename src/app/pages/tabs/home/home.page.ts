import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { SwiperModule } from 'src/app/components/swiper/swiper.module';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { Card } from 'src/app/interfaces/card.inteface';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { FlatButtonModule } from 'src/app/components/flat-button/flat-button.module';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanService } from 'src/app/services/plan-service.service';
import { User } from 'src/app/models/user.model';
import { CardModule } from 'src/app/components/card/card.components.module';

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
export class HomePage implements OnInit {
    maxCardsPerRow: number;
    cards: Card[] = [];
    planFav: Card[] = [];
    planRec: Card[] = [];
    planPop: Card[] = [];

    results: Card[];

    constructor(
        private nav: NavController,
        private authService: AuthenticationService,
        private planService: PlanService,
        private router: Router
    ) {}

    async ngOnInit() {
        const plans = await this.planService.getAllPlanOfUserFavorite(
            {} as User
        );

        this.results = plans.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                time: plan.duration.toString(),
                isFavorite: plan.is_favourite,
            } as Card;
        });

        console.log(this.results);

        this.handleChangeIndex(0);
        this.calculateMaxCardsPerRow();
        this.results = this.cards;
    }

    handleResult(filteredResults: Card[]) {
        this.results = filteredResults;
    }

    goToMyPlans() {
        this.router.navigate(['/tabs/home/mine']);
    }

    goToPlans() {
        this.router.navigate(['/tabs/home/category']);
    }

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }

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
    }

    calculateMaxCardsPerRow(): void {
        const cardWidth = 164; // Largura fixa do card em pixels
        const margin = 10; // Margem em pixels
        const gap = 2; // Espaçamento mínimo entre os cards em pixels

        const containerWidth =
            document.querySelector('.card-row')?.clientWidth ?? 0;
        const availableWidth = containerWidth - margin * 2;
        const maxCards = Math.floor(availableWidth / (cardWidth + gap));
        this.maxCardsPerRow = Math.max(1, maxCards); // Define o mínimo de 1 card por linha
    }

    private setResultList(cards: Card[]) {
        this.results = this.cards;
    }
}
