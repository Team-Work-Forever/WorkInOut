import { CommonModule } from '@angular/common';
import {
    Component,
    ContentChildren,
    Input,
    OnInit,
    QueryList,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Data, loadTourismPoints } from 'src/app/services/api';

export interface Card {
    title: string;
    image: string;
    description: string;
    list: Data[];
}

@Component({
    standalone: true,
    imports: [CommonModule, IonicModule, FormsModule],
    selector: 'app-work-header',
    templateUrl: './work-header.component.html',
    styleUrls: ['./work-header.component.scss'],
})
export class WorkHeaderComponent implements OnInit {
    @Input()
    isNested: boolean = false;

    @Input()
    title: string = 'Bem Vindo';

    @ContentChildren('widget')
    widgets: QueryList<Component>;

    results: any[];
    cards: Card[];

    constructor() {
        this.cards = [
            {
                title: 'Pontos de interesse turísticos',
                image: '/assets/pontosTuristicos.png',
                description:
                    'Póvoa de Varzim é uma cidade costeira situada no norte de Portugal, que apresenta uma variedade de pontos turísticos.',
                list: loadTourismPoints(),
            },
        ];

        this.results = this.cards;
    }

    ngOnInit() {}

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
}
