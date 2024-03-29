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
import { MessageManagerService } from 'src/app/services/message-manager.service';
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
        private messageManager: MessageManagerService,
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

        // Make the results be the filtered exercises
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

        // If the exercise exists in the selected exercises, it is removed
        if (index !== -1) {
            this.selectedItems.splice(index, 1);
        } else {
            this.selectedItems.push(exercise);
        }

        // Change the duration of the plan
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
     * Present a notification when button "Adicionar" is pressed
     * @param position
     * @param title
     * @returns
     */
    async presentToast() {
        if (this.isEmpty()) {
            await this.toastService.showToast(
                this.messageManager.getMessages().exercise.failNotification
                    .PleaseSelectAnExercise,
                'top'
            );
        } else {
            await this.toastService.showToast(
                this.messageManager.getMessages().exercise.successNotification
                    .TheExercisesWereAdded,
                'top'
            );
        }

        // If the plan don't have any exercise selected return void
        if (this.selectedItems.length === 0) return;

        // If the plan have selected exercices, navigate to the create page of the plan
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

    handleChange(event: any) {
        const searchTerm = event.target.value;
        if (searchTerm && searchTerm.trim() !== '') {
            const filteredResults = this.results.filter((option) =>
                option.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            this.results = filteredResults;
        } else {
            this.results = this.exercices;
        }
    }
}
