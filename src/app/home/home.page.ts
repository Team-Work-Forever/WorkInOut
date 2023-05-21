import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Data, loadTourismPoints } from '../services/api';
import { WorkHeaderComponent } from '../components/work-header/work-header.component';

export interface Card {
    title: string;
    image: string;
    time: string;
    list: Data[];
    isFavorite: boolean;
}

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, WorkHeaderComponent],
})
export class HomePage {
    results: any[];
    cards: Card[];

    constructor(private nav: NavController) {
        this.cards = [
            {
                title: 'Treino',
                image: '/assets/workType/alongamentos.png',
                time: '2 min',
                list: loadTourismPoints(),
                isFavorite: false,
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

    handleChange(event: any) {
        const searchTerm = event.target.value;
        if (searchTerm && searchTerm.trim() !== '') {
            this.results = this.cards.filter((card) => {
                return (
                    card.title
                        .toLowerCase()
                        .indexOf(searchTerm.toLowerCase()) !== -1
                );
            });
        } else {
            this.results = this.cards;
        }
    }

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }

    toggleFavorite(card: Card) {
        card.isFavorite = !card.isFavorite;
    }
}
