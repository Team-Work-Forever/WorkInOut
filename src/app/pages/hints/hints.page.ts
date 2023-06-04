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
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Present the symbol of loading
        this.isLoading = true;

        // Get all Hints
        const hints = await this.hintsService.getAllHints();

        // Define all Hints
        this.hints = hints.map((hint) => {
            return {
                id: hint.id,
                image: hint.image,
                title: hint.title,
                description: hint.description,
                color: hint.color,
            } as Hint;
        });

        // End the loading
        this.isLoading = false;
    }

    async ngOnInit() {
        this.calculateMaxCardsPerRow();
    }

    /**
     * Show description of the hint by a modal
     * @param description
     */
    async handleClick(description) {
        const modal = await this.modalCtrl.create({
            component: HintModalComponent,
            componentProps: {
                description: description,
            },
        });
        modal.present();
    }

    /**
     * Open the modal
     */
    async openModal() {
        const modal = await this.modalCtrl.create({
            component: HintModalComponent,
        });
        modal.present();
    }

    /**
     * Calculate the maximum number of cards in a row
     */
    calculateMaxCardsPerRow(): void {
        const cardWidth = 164;
        const margin = 10;
        const gap = 2;

        const containerWidth =
            document.querySelector('.card-row')?.clientWidth ?? 0;
        const availableWidth = containerWidth - margin * 2;
        const maxCards = Math.floor(availableWidth / (cardWidth + gap));
        this.maxCardsPerRow = Math.max(1, maxCards);
    }
}
