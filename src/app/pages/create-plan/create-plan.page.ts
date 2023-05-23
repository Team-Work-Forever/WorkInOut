import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import {
    ItemReorderEventDetail,
    NavController,
    ToastController,
} from '@ionic/angular';
import { CreateRouteProps } from 'src/app/interfaces/create-route.interface';
import { ExerciseItem } from 'src/app/interfaces/exercise-item.interface';
import { Exercise } from 'src/app/models/exercise.model';
=======
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemReorderEventDetail } from '@ionic/angular';
>>>>>>> pages
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-create-plan',
    templateUrl: './create-plan.page.html',
    styleUrls: ['./create-plan.page.scss'],
})
export class CreatePlanPage implements OnInit {
    planTitle: string = 'Novo Treino';
    choosenExercises: ExerciseItem[] = [];

<<<<<<< HEAD
    constructor(
        public toastController: ToastController,
        private planService: PlanService,
        private nav: NavController
    ) {}
=======
    constructor(private planService: PlanService, private router: Router) {}
>>>>>>> pages

    ngOnInit() {
        var data = history.state as CreateRouteProps;

        if (data) {
            console.log(data.exercises);

            this.choosenExercises = data.exercises ? data.exercises : [];
            this.planTitle = data.title ? data.title : 'Novo Plano';
        }
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

    planTitleChanged(event: string) {
        this.planTitle = event;
    }

    addExercise() {
        this.nav.navigateForward('/tabs/home/mine/add', {
            state: {
                title: this.planTitle,
                exercises: this.choosenExercises,
            } as CreateRouteProps,
        });
    }

    async showToast(title: string) {
        const toast = await this.toastController.create({
            message: title,
            duration: 2000,
            position: 'top',
        });

        toast.present();
    }

    async createPlan() {
        if (this.planTitle.length === 0) {
            this.showToast('Não se esqueça de adicionar um titulo ao plano!');
            return;
        }

        if (this.choosenExercises.length === 0) {
            this.showToast('Não se esqueça de adicionar um exercício!');
            return;
        }

        const createdPlan = await this.planService.createPlan(
            {
                badge: 'xdasdas',
                color: '#000',
                duration: 2,
                is_favourite: false,
                title: this.planTitle,
            } as Plan,
            {
                userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
            } as User
        );

        await this.planService.addExercises(
            createdPlan,
            this.choosenExercises.map((item) => {
                return {
                    id: item.id,
                    title: item.title,
                    video_url: item.video_url,
                    duration: parseFloat(item.duration),
                    index: 0,
                } as Exercise;
            })
        );
    }
}
