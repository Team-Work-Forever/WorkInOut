import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { ExerciseModule } from 'src/app/components/exercise/exercise.module';
import { FlagDisplayerModule } from 'src/app/components/flag-displayer/flag-displayer.module';
import { ItemVisualizerModule } from 'src/app/components/item-visualizer/item-visualizer.module';
import { ModelItemComponent } from 'src/app/components/model-item/model-item.component';
import { SchedualSelectionComponent } from 'src/app/components/schedule-selection/schedual-selection.component';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { ImageContent } from 'src/app/interfaces/imageContent.interface';
import { Exercise } from 'src/app/models/exercise.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { getMaterial } from 'src/app/services/api';
import { PlanService } from 'src/app/services/plan-service.service';

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
        ExerciseModule,
        ItemVisualizerModule,
    ],
})
export class InfoPlanPage implements OnInit {
    plan: Plan;
    exercises: Exercise[];

    imageContainer: ImageContent[];
    results: ImageContent[];
    selectedItems: Exercise[] = [];
    maxCardsPerRow: number;

    constructor(
        private modalCtrl: ModalController,
        public toastController: ToastController,
        private planService: PlanService,
        private activeRoute: ActivatedRoute,
        private router: Router
    ) {}

    async ngOnInit() {
        const planId = this.activeRoute.snapshot.paramMap.get('id');

        this.plan = await this.planService.getPlanOfUserById(planId, {
            userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
        } as User);

        this.exercises = await this.planService.getExercisesFromPlanById(
            planId
        );

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

    startPlan() {
        this.router.navigate(['/tabs/home/play/' + this.plan.id]);
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
