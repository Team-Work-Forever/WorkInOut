import { Component, OnInit } from '@angular/core';

interface Card {
    title: string;
    color: string;
}

@Component({
    selector: 'app-category-plan',
    templateUrl: './category-plan.page.html',
    styleUrls: ['./category-plan.page.scss'],
})
export class CategoryPlanPage implements OnInit {
    cards: Card[];

    constructor() {
        this.cards = [
            {
                title: 'Força',
                color: '#C10A0A',
            },
            {
                title: 'Alongamentos',
                color: '#D881BE',
            },
            {
                title: 'Cardio',
                color: '#A2C17B',
            },
            {
                title: 'Ioga',
                color: '#F1AFAE',
            },
        ];
    }

    ngOnInit() {}
}
