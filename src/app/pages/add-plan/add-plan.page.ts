import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CreateRouteProps } from 'src/app/interfaces/create-route.interface';
import { ExerciseItem } from 'src/app/interfaces/exercise-item.interface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'app-add-plan',
    templateUrl: './add-plan.page.html',
    styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements ViewWillEnter {
    public isLoading: boolean = false;
    title: string = 'Novo Treino';

    selectedItems: ExerciseItem[] = [];
    selectedCategories: BehaviorSubject<Category[]> = new BehaviorSubject([]);

    categories: HorizontalItem[];
    exercices: ExerciseItem[];
    results: ExerciseItem[];

    duration: number = 0;

    constructor(
        public toastService: ToastService,
        private categoryService: CategoryService,
        private exerciseService: ExerciseService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {}

    async ionViewWillEnter() {
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Present the symbol of loading
        this.isLoading = true;

        // Collect the id of the plan
        const plan = JSON.parse(
            this.activeRoute.snapshot.paramMap.get('plan')
        ) as CreateRouteProps;

        this.selectedCategories.next(plan.categories);
        this.selectedItems = plan.exercises;
        this.checkDuration();

        // Get all Exercises and Categories
        const exercices = await this.exerciseService.getAllExercises();
        const categories = await this.categoryService.getAllCategories();

        // Define all Exercises
        this.exercices = exercices.map((exe) => {
            return {
                id: exe.id,
                title: exe.title,
                duration: exe.duration,
                category: exe.category,
            } as ExerciseItem;
        });

        // Define all Categories
        this.categories = categories.map((cat) => {
            return {
                id: cat.id,
                title: cat.title,
                color: cat.color,
            } as HorizontalItem;
        });

        // Make the exercises selected be with a border
        this.exercices.forEach((exe) => {
            if (this.selectedItems.find((item) => item.id === exe.id)) {
                exe.isSelected = true;
            }
        });

        this.title = plan.title;
        this.results = this.exercices;

        // End the loading
        this.isLoading = false;
    }

    /**
     * Change the duration of the plan by the exercises selected
     */
    checkDuration() {
        this.duration = this.selectedItems.reduce(
            (sum, item) => sum + item.duration,
            0
        );
    }

    /**
     * Change presentation of exercises by categories selected
     * @param event
     * @returns
     */
    async selectedCategoriesChanged(event: string[]) {
        const filtedExercises =
            await this.exerciseService.getFilteredExercicies(event);

        // If all categories are unselected, present all the exercises
        if (event.length === 0) {
            this.results = [];
            return;
        }

        this.results = filtedExercises.map((exe) => {
            return {
                id: exe.id,
                category: exe.category,
                duration: exe.duration,
                index: exe.index,
                title: exe.title,
                isSelected: !!this.selectedItems.find(
                    (item) => item.id === exe.id
                ),
            } as ExerciseItem;
        });
    }

    /**
     * Add or remove exercises by theirs state of selection
     * @param exercise
     */
    addToSelected(exercise: ExerciseItem) {
        const index = this.selectedItems.findIndex(
            (item) => item.id === exercise.id
        );

        if (index !== -1) {
            this.selectedItems.splice(index, 1);
        } else {
            this.selectedItems.push(exercise);
        }

        this.checkDuration();
    }

    /**
     * Verify if there are selected exercises
     * @returns
     */
    isEmpty() {
        return this.selectedItems.length === 0;
    }

    /**
     * Change the title of the plan
     * @param event
     */
    planTitleChanged(event: string) {
        this.title = event;
    }

    /**
     * Present a notification
     * @param position
     * @param title
     * @returns
     */
    async presentToast(position, title) {
        await this.toastService.showToast(title, position);

        if (this.selectedItems.length === 0) return;

        this.router.navigate(
            [
                '/tabs/home/mine/create/' +
                    JSON.stringify({
                        title: this.title,
                        exercises: this.selectedItems,
                    } as CreateRouteProps),
            ],
            {
                skipLocationChange: true,
                replaceUrl: true,
            }
        );
    }
}
