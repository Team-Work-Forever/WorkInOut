import { CommonModule } from '@angular/common';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { loadTourismPoints } from '../../../services/api';
import { SwiperModule } from 'src/app/components/swiper/swiper.module';
import { CheckButtonModule } from 'src/app/components/check-button/components.module';
import { CardComponent } from '../../../components/card/card.component';
import { Card } from 'src/app/interfaces/card.inteface';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { FlatButtonModule } from 'src/app/components/flat-button/flat-button.module';
import { PlanService } from 'src/app/services/plan.service';
import { SwiperComponent } from 'src/app/components/swiper/swiper.component';

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
        CardComponent,
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

    constructor(private nav: NavController, private planService: PlanService) {}

    async ngOnInit() {
        const plans = await this.planService.getAllPlans();

        this.cards = plans.map((plan) => {
            return {
                id: plan.id,
                title: plan.title,
                time: plan.duration.toString(),
                isFavorite: false,
            } as Card;
        });

        this.calculateMaxCardsPerRow();
    }

    handleResult(filteredResults: Card[]) {
        this.results = filteredResults;
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
