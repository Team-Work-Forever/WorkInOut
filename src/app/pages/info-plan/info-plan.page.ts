import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import {
    IonicModule,
    ModalController,
    ToastController,
    ViewWillEnter,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ExerciseModule } from 'src/app/components/exercise/exercise.module';
import { FlagDisplayerModule } from 'src/app/components/flag-displayer/flag-displayer.module';
import { ItemVisualizerModule } from 'src/app/components/item-visualizer/item-visualizer.module';
import { ModelItemComponent } from 'src/app/components/model-item/model-item.component';
import { SchedualSelectionComponent } from 'src/app/components/schedule-selection/schedual-selection.component';
import { WorkHeaderModule } from 'src/app/components/work-header/work-header.module';
import { ImageContent } from 'src/app/interfaces/imageContent.interface';
import { Category } from 'src/app/models/category.model';
import { Exercise } from 'src/app/models/exercise.model';
import { Plan } from 'src/app/models/plan.model';
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
export class InfoPlanPage implements OnInit, ViewWillEnter {
    public isLoading: boolean = false;

    plan: Plan;
    exercises: Exercise[];
    categories: BehaviorSubject<Category[]> = new BehaviorSubject([]);

    imageContainer: ImageContent[];
    resultsImageCont: ImageContent[];
    selectedItems: Exercise[] = [];
    maxCardsPerRow: number;
    results: Exercise[];

    constructor(
        private modalCtrl: ModalController,
        public toastController: ToastController,
        private planService: PlanService,
        private activeRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.calculateMaxCardsPerRow();
    }

    async ionViewWillEnter() {
        this.isLoading = true;

        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        const planId = this.activeRoute.snapshot.paramMap.get('id');

        this.plan = await this.planService.getPlanById(planId);

        this.categories.next(
            await this.planService.getCategoriesFromPlan(planId)
        );

        this.exercises = await this.planService.getExercisesFromPlanById(
            planId
        );

        const getMaterials = await fetch('./assets/data/materials.json');

        this.imageContainer = [
            {
                title: 'Estimativa de calorias gastas',
                image: '/assets/calorias.png',
                qt: 600,
            },
            {
                title: 'Materiais Necessários',
                image: '/assets/materiais.png',
                material: (await getMaterials.json()).materials,
            },
        ];

        this.results = this.exercises;
        this.resultsImageCont = this.imageContainer;

        this.isLoading = false;
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
            componentProps: {
                plan: this.plan,
            },
        });
        modal.present();
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
}
