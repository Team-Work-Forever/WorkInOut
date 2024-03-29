import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { IonicModule, ModalController, ViewWillEnter } from '@ionic/angular';
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
import { ToastService } from 'src/app/services/toast.service';

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
        public toastService: ToastService,
        private planService: PlanService,
        private activeRoute: ActivatedRoute,
        private router: Router
    ) {}
    ngOnInit(): void {
        this.calculateMaxCardsPerRow();
    }

    async ionViewWillEnter() {
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Present the symbol of loading
        this.isLoading = true;

        // Collect the id of the plan
        const planId = this.activeRoute.snapshot.paramMap.get('id');

        // Get plan by id collected
        this.plan = await this.planService.getPlanById(planId);

        // Get categories from plan
        this.categories.next(
            await this.planService.getCategoriesFromPlan(planId)
        );

        // Get exercises from plan
        this.exercises = await this.planService.getExercisesFromPlanById(
            planId
        );

        // Get all materials
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

        // End the loading
        this.isLoading = false;
    }

    /**
     * Open modal of materials necessary to the plan
     * @param material
     */
    async handleClick(material) {
        const modal = await this.modalCtrl.create({
            component: ModelItemComponent,
            componentProps: {
                materials: material,
            },
        });
        modal.present();
    }

    /**
     * Navigate to the page where is possible to begin the plan
     */
    startPlan() {
        this.router.navigate(['/tabs/home/play/' + this.plan.id]);
    }

    /**
     * Calculate the maximum number of cards in a row
     */
    calculateMaxCardsPerRow(): void {
        const containerWidth =
            document.querySelector('.card-wrapper')?.clientWidth ?? 0;
        const cardWidth = 318 + 2 + 24;
        const maxCards = Math.floor((containerWidth - 44) / cardWidth);
        this.maxCardsPerRow = Math.max(1, maxCards);
    }

    /**
     * Open the modal
     */
    async openModal() {
        const modal = await this.modalCtrl.create({
            component: SchedualSelectionComponent,
            componentProps: {
                plan: this.plan,
            },
        });
        modal.present();
    }

    /**
     * Present a notification
     * @param position
     * @param title
     */
    async presentToast(position, title) {
        await this.toastService.showToast(title, position);
    }
}
