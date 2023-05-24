import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import {
    ItemReorderEventDetail,
    ToastController,
    ViewWillEnter,
} from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CreateRouteProps } from 'src/app/interfaces/create-route.interface';
import { ExerciseItem } from 'src/app/interfaces/exercise-item.interface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
    selector: 'app-add-plan',
    templateUrl: './add-plan.page.html',
    styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit, ViewWillEnter {
    title: string = 'Novo Plano';

    selectedItems: ExerciseItem[] = [];
    selectedCategories: BehaviorSubject<Category[]> = new BehaviorSubject([]);

    categories: HorizontalItem[];
    exercices: ExerciseItem[];
    results: ExerciseItem[];

    constructor(
        public toastController: ToastController,
        private categoryService: CategoryService,
        private exerciseService: ExerciseService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    async ngOnInit() {
        const plan = JSON.parse(
            this.activeRoute.snapshot.paramMap.get('plan')
        ) as CreateRouteProps;

        this.selectedCategories.next(plan.categories);
        this.selectedItems = plan.exercises;

        console.log(this.selectedItems);

        const exercices = await this.exerciseService.getAllExercises();
        const categories = await this.categoryService.getAllCategories();

        this.exercices = exercices.map((exe) => {
            return {
                id: exe.id,
                title: exe.title,
                duration: exe.duration,
                category: exe.category,
            } as ExerciseItem;
        });

        this.categories = categories.map((cat) => {
            return {
                title: cat.title,
                color: cat.color,
            } as HorizontalItem;
        });

        this.exercices.forEach((exe) => {
            if (this.selectedItems.find((item) => item.id === exe.id)) {
                exe.isSelected = true;
            }
        });

        this.title = plan.title;
        this.results = this.exercices;
    }

    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        ev.detail.complete();
    }

    addToSelected(exercise: ExerciseItem) {
        const index = this.selectedItems.findIndex(
            (item) => item.id === exercise.id
        );

        if (index !== -1) {
            this.selectedItems.splice(index, 1); // Remove o exercício se ele já estiver selecionado
        } else {
            this.selectedItems.push(exercise); // Adiciona o exercício se ele ainda não estiver selecionado
        }
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

        if (this.selectedItems.length === 0) return;

        this.router.navigate([
            '/tabs/home/mine/create/' +
                JSON.stringify({
                    title: this.title,
                    exercises: this.selectedItems,
                } as CreateRouteProps),
        ]);
    }
}
