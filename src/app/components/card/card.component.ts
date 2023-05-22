import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/interfaces/card.inteface';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule, IonicModule],
    selector: 'app-card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss'],
})
export class CardComponent implements OnInit {
    @Input()
    isFavorite: boolean;

    @Input()
    image: string = '';

    @Input()
    title: string = 'Treino';

    @Input()
    time: string = '';

    @Input()
    icon: string;

    option: string;

    ngOnInit(): void {
        this.option = this.isFavorite
            ? this.icon + '-sharp'
            : this.icon + '-outline';
    }

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
        this.option = this.isFavorite
            ? this.icon + '-sharp'
            : this.icon + '-outline';
    }
}
