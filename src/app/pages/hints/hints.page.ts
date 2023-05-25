import { Component, OnInit } from '@angular/core';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ModalController, ViewWillEnter } from '@ionic/angular';
import { HintModalComponent } from 'src/app/components/hint-modal/hint-modal.component';
import { Hint } from 'src/app/interfaces/hint.interface';
import { HintService } from 'src/app/services/hint.service.service';

@Component({
    selector: 'app-hints',
    templateUrl: './hints.page.html',
    styleUrls: ['./hints.page.scss'],
})
export class HintsPage implements OnInit, ViewWillEnter {
    public isLoading: boolean = false;

    maxCardsPerRow: number;
    hints: Hint[] = [];

    constructor(
        private hintsService: HintService,
        private modalCtrl: ModalController
    ) {}

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        this.isLoading = true;

        const hints = await this.hintsService.getAllHints();

        this.hints = hints.map((hint) => {
            return {
                id: hint.id,
                image: hint.image,
                title: hint.title,
                description: hint.description,
                color: hint.color,
            } as Hint;
        });

        this.isLoading = false;
    }

    async ngOnInit() {
        this.calculateMaxCardsPerRow();
    }

    async handleClick(description) {
        const modal = await this.modalCtrl.create({
            component: HintModalComponent,
            componentProps: {
                description: description,
            },
        });
        modal.present();
    }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: HintModalComponent,
        });
        modal.present();
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
