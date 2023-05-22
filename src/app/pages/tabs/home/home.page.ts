import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { loadTourismPoints } from '../../../services/api';
import { WorkHeaderComponent } from '../../../components/work-header/work-header.component';
import { SwiperModule } from 'src/app/components/swiper/swiper.module';
import { CardComponent } from '../../../components/card/card.component';
import { Card } from 'src/app/interfaces/card.inteface';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        WorkHeaderComponent,
        SwiperModule,
        CardComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
    results: Card[];
    cards: Card[];
    maxCardsPerRow: number;

    constructor(private nav: NavController) {
        this.cards = [
            {
                title: 'Treino',
                image: '/assets/workType/alongamentos.png',
                time: '2 min',
                list: loadTourismPoints(),
                isFavorite: true,
            },
            {
                title: 'Treino',
                image: '/assets/workType/cardio.png',
                time: '1 min',
                list: loadTourismPoints(),
                isFavorite: false,
            },
            {
                title: 'Treino',
                image: '/assets/workType/forca.png',
                time: '20 min',
                list: loadTourismPoints(),
                isFavorite: false,
            },
            {
                title: 'Treino',
                image: '/assets/workType/forca.png',
                time: '20 min',
                list: loadTourismPoints(),
                isFavorite: false,
            },
            {
                title: 'Treino',
                image: '/assets/workType/forca.png',
                time: '20 min',
                list: loadTourismPoints(),
                isFavorite: false,
            },
            {
                title: 'Treino',
                image: '/assets/workType/forca.png',
                time: '20 min',
                list: loadTourismPoints(),
                isFavorite: false,
            },
            {
                title: 'Treino',
                image: '/assets/workType/forca.png',
                time: '20 min',
                list: loadTourismPoints(),
                isFavorite: false,
            },
        ];

        this.results = this.cards;
    }

    ngOnInit() {
        this.calculateMaxCardsPerRow();
    }

    handleResult(filteredResults: Card[]) {
        this.results = filteredResults;
    }

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
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
}
