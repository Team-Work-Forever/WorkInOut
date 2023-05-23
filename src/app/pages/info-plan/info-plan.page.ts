import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ExerciseModule } from 'src/app/components/exercise/exercise.module';
import { FlagDisplayerModule } from 'src/app/components/flag-displayer/flag-displayer.module';
import { ModelItemComponent } from 'src/app/components/model-item/model-item.component';
import { SchedualSelectionComponent } from 'src/app/components/schedule-selection/schedual-selection.component';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { Exercise } from 'src/app/interfaces/exercise.interface';
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
        ExerciseModule,
        FlagDisplayerModule,
    ],
})
export class InfoPlanPage implements OnInit {
    imageContainer: ImageContent[];
    results: ImageContent[];
    selectedItems: Exercise[] = [];
    exercises: Exercise[];
    maxCardsPerRow: number;

    constructor(
        public toastController: ToastController,
        private modalCtrl: ModalController
    ) {
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

        this.exercises = [
            {
                id: 1,
                title: 'Break',
                duration: '2:00min',
                videoUrl: '',
            },
            {
                id: 2,
                title: 'Break',
                duration: '3:00min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Break',
                duration: '4:00min',
                videoUrl: '',
            },
            {
                id: 4,
                title: 'Break',
                duration: '5:00min',
                videoUrl: '',
            },
        ];
    }

    ngOnInit() {
        this.calculateMaxCardsPerRow();
    }

    async handleClick(material) {
        const modal = await this.modalCtrl.create({
            component: ModelItemComponent,
            componentProps: {
                materials: material,
            },
        });
        modal.present();
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

    addToSelected(exercise: Exercise) {
        const index = this.selectedItems.findIndex(
            (item) => item.id === exercise.id
        );

        if (index !== -1) {
            this.selectedItems.splice(index, 1); // Remove o exercício se ele já estiver selecionado
        } else {
            this.selectedItems.push(exercise); // Adiciona o exercício se ele ainda não estiver selecionado
        }
        console.log(this.selectedItems);
    }

    isEmpty() {
        return this.selectedItems.length === 0;
    }

    async presentToast(position, title) {
        const toast = await this.toastController.create({
            message: title,
            duration: 2000,
            position: position,
        });
        toast.present();
    }

    isActionSheetOpen = false;
    public actionSheetButtons = [
        {
            text: 'Remover',
            role: 'destructive',
            data: {
                action: 'delete',
            },
        },
        {
            text: 'Cancelar',
            role: 'cancel',
            data: {
                action: 'cancel',
            },
        },
    ];

    setOpen(isOpen: boolean) {
        this.isActionSheetOpen = isOpen;
    }
}
