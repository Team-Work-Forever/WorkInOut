import { Component, OnInit } from '@angular/core';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { Hint } from 'src/app/interfaces/hint.interface';
import { HintService } from 'src/app/services/hint.service.service';

@Component({
    selector: 'app-hints',
    templateUrl: './hints.page.html',
    styleUrls: ['./hints.page.scss'],
})
export class HintsPage implements OnInit, ViewWillEnter {
    maxCardsPerRow: number;
    hints: Hint[] = [];

    constructor(private hintsService: HintService) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    async ngOnInit() {
        const hints = await this.hintsService.getAllHints();

        this.hints = hints.map((hint) => {
            return {
                id: hint.id,
                badge: hint.badge,
                title: hint.title,
                description: hint.description,
                color: hint.color,
            } as Hint;
        });

        this.calculateMaxCardsPerRow();
    }

    handleClick(hint: Hint) {}

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
