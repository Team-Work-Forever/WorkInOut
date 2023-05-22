import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CardComponent } from 'src/app/components/card/card.component';
import { WorkHeaderComponent } from 'src/app/components/work-header/work-header.component';
import { Card } from 'src/app/interfaces/card.inteface';
import { loadTourismPoints } from 'src/app/services/api';

@Component({
    selector: 'app-my-plan',
    templateUrl: './my-plan.page.html',
    styleUrls: ['./my-plan.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, WorkHeaderComponent, CardComponent],
})
export class MyPlanPage implements OnInit {
    results: Card[];
    cards: Card[];

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
                image: '/assets/workType/cardio.png',
                time: '1 min',
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
                image: '/assets/workType/cardio.png',
                time: '1 min',
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
                image: '/assets/workType/cardio.png',
                time: '1 min',
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
                image: '/assets/workType/cardio.png',
                time: '1 min',
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
                image: '/assets/workType/cardio.png',
                time: '1 min',
                list: loadTourismPoints(),
                isFavorite: false,
            },
        ];

        this.results = this.cards;
    }

    ngOnInit() {}

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }
}
