import { Component, OnInit } from '@angular/core';
import { Hint } from 'src/app/interfaces/hint.interface';

@Component({
    selector: 'app-hints',
    templateUrl: './hints.page.html',
    styleUrls: ['./hints.page.scss'],
})
export class HintsPage implements OnInit {
    maxCardsPerRow: number;
    hints: Hint[] = [];
    results: Hint[];

    constructor() {}

    ngOnInit() {
        this.calculateMaxCardsPerRow();
        this.results = this.hints;
    }

    handleClick(hint: Hint) {
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
