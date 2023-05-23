import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail, ToastController } from '@ionic/angular';
import { Exercise } from 'src/app/interfaces/exercise.interface';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-add-plan',
    templateUrl: './add-plan.page.html',
    styleUrls: ['./add-plan.page.scss'],
})
export class AddPlanPage implements OnInit {
    selectedItems: Exercise[] = [];
    categories: HorizontalItem[];
    exercises: Exercise[];
    results: Exercise[];

    constructor(
        public toastController: ToastController,
        private categoryService: CategoryService
    ) {
        this.exercises = [
            {
                id: 1,
                title: 'Alongamento Cobra',
                duration: '2:00 min',
                videoUrl: '',
            },
            {
                id: 2,
                title: 'Alongamento Braços',
                duration: '4:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
            {
                id: 3,
                title: 'Alongamento Pernas',
                duration: '1:00 min',
                videoUrl: '',
            },
        ];

        this.results = this.exercises;
    }

    async ngOnInit() {
        const categories = await this.categoryService.getAllCategories();

        this.categories = categories.map((cat) => {
            return {
                title: cat.title,
                color: cat.color,
            } as HorizontalItem;
        });
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
}
