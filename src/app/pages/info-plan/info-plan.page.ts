import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { ItemVisualizerModule } from 'src/app/components/item-visualizer/item-visualizer.module';
import { SchedualSelectionComponent } from 'src/app/components/schedule-selection/schedual-selection.component';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { ImageContent } from 'src/app/interfaces/imageContent.interface';
import { getMaterial } from 'src/app/services/api';

@Component({
    selector: 'app-info-plan',
    templateUrl: './info-plan.page.html',
    styleUrls: ['./info-plan.page.scss'],
    standalone: true,
    imports: [
        IonicModule,
        CommonModule,
        WorkHeaderModule,
        ItemVisualizerModule,
    ],
})
export class InfoPlanPage implements OnInit {
    imageContainer: ImageContent[];
    results: ImageContent[];
    maxCardsPerRow: number;

    constructor(private modalCtrl: ModalController) {
        this.imageContainer = [
            {
                title: 'Estimativa de calorias gastas',
                image: '/assets/calorias.png',
                qt: 600,
            },
            {
                title: 'Materiais Necessários',
                image: '/assets/materiais.png',
                material: getMaterial(),
            },
        ];

        this.results = this.imageContainer;
    }

    ngOnInit() {
        this.calculateMaxCardsPerRow();
    }

    handleClick() {
        console.log('Oi!, WOW');
    }

    calculateMaxCardsPerRow(): void {
        const containerWidth =
            document.querySelector('.card-wrapper')?.clientWidth ?? 0;
        const cardWidth = 318 + 2 + 24; // Largura fixa do card + 2px de espaçamento + 24px de margem
        const maxCards = Math.floor((containerWidth - 44) / cardWidth); // Subtrai as margens laterais do container
        this.maxCardsPerRow = Math.max(1, maxCards); // Define o mínimo de 1 card por linha
    }

    async openModal() {
        const modal = await this.modalCtrl.create({
            component: SchedualSelectionComponent,
        });
        modal.present();
    }
}
