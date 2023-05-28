import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ToastController, ViewWillEnter } from '@ionic/angular';
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
        public toastController: ToastController,
        private categoryService: CategoryService,
        private exerciseService: ExerciseService,
        private router: Router,
        private activeRoute: ActivatedRoute
    ) {}

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        this.isLoading = true;

        const plan = JSON.parse(
            this.activeRoute.snapshot.paramMap.get('plan')
        ) as CreateRouteProps;

        this.selectedCategories.next(plan.categories);
        this.selectedItems = plan.exercises;
        this.checkDuration();

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
                id: cat.id,
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

        this.isLoading = false;
    }

    checkDuration() {
        this.duration = this.selectedItems.reduce(
            (sum, item) => sum + item.duration,
            0
        );
    }

    async selectedCategoriesChanged(event: string[]) {
        console.log(event);

        const filtedExercises =
            await this.exerciseService.getFilteredExercicies(event);

        console.log(filtedExercises);

        if (filtedExercises.length === 0 && event.length === 0) {
            this.results = this.exercices;
            return;
        }

        this.results = filtedExercises.map((exe) => {
            return {
                id: exe.id,
                category: exe.category,
                duration: exe.duration,
                index: exe.index,
                title: exe.title,
                video_url: exe.video_url,
            } as ExerciseItem;
        });
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

        this.checkDuration();
    }

    isEmpty() {
        return this.selectedItems.length === 0;
    }

    planTitleChanged(event: string) {
        this.title = event;
    }

    async presentToast(position, title) {
        const toast = await this.toastController.create({
            message: title,
            duration: 2000,
            position: position,
        });

        toast.present();

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
