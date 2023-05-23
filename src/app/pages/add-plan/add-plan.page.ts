import { Component, OnInit } from '@angular/core';
import {
    ItemReorderEventDetail,
    NavController,
    ToastController,
} from '@ionic/angular';
import { CreateRouteProps } from 'src/app/interfaces/create-route.interface';
import { ExerciseItem } from 'src/app/interfaces/exercise-item.interface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { CategoryService } from 'src/app/services/category.service';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
    selector: 'app-add-plan',
    templateUrl: './add-plan.page.html',
    styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {
    title: string;

    selectedItems: ExerciseItem[] = [];
    categories: HorizontalItem[];
    exercises: ExerciseItem[];
    results: ExerciseItem[];

    constructor(
        public toastController: ToastController,
        private categoryService: CategoryService,
        private exerciseService: ExerciseService,
        private nav: NavController
    ) {}

    async ngOnInit() {
        var data = history.state as CreateRouteProps;

        const exercices = await this.exerciseService.getAllExercises();
        const categories = await this.categoryService.getAllCategories();

        this.exercises = exercices.map((exe) => {
            return {
                id: exe.id,
                title: exe.title,
                duration: exe.duration + ':00 min',
                video_url: exe.video_url,
            } as ExerciseItem;
        });

        this.categories = categories.map((cat) => {
            return {
                title: cat.title,
                color: cat.color,
            } as HorizontalItem;
        });

        this.title = data.title;
        this.selectedItems = data.exercises ? data.exercises : [];
        this.results = this.exercises;
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

        if (this.selectedItems.length === 0) return;

        this.nav.navigateForward('/tabs/home/mine/create', {
            state: {
                title: this.title,
                exercises: this.selectedItems,
            } as CreateRouteProps,
        });
    }
}
