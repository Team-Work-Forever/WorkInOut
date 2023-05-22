import { Component, Input } from '@angular/core';
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
export class CardComponent {
    @Input()
    isFavorite: boolean = false;

    @Input()
    image: string = '';

    @Input()
    title: string = 'Treino';

    @Input()
    time: string = '';

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}
