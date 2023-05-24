import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ItemReorderEventDetail,
    NavController,
    ToastController,
} from '@ionic/angular';
import { CreateRouteProps } from 'src/app/interfaces/create-route.interface';
import { ExerciseItem } from 'src/app/interfaces/exercise-item.interface';
import { Exercise } from 'src/app/models/exercise.model';
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

    constructor(
        public toastController: ToastController,
        private planService: PlanService,
        private activeRoute: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        const info = this.activeRoute.snapshot.paramMap.get('plan');

        const plan =
            info != 'nocontent' ? (JSON.parse(info) as CreateRouteProps) : '';

        if (plan) {
            this.choosenExercises = plan.exercises ? plan.exercises : [];
            this.planTitle = plan.title ? plan.title : 'Novo Plano';
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
        this.router.navigate([
            '/tabs/home/mine/add/' +
                JSON.stringify({
                    title: this.planTitle,
                    exercises: this.choosenExercises,
                } as CreateRouteProps),
        ]);
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
                badge: 'https://qbkliymokbvleuaxyiwn.supabase.co/storage/v1/object/public/SUPASUPA/ioga.png?t=2023-05-24T10%3A22%3A25.794Z',
                color: '#000',
                duration: 2,
                is_favourite: false,
                title: this.planTitle,
            } as Plan,
            {
                userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
            } as User
        );

        if (!createdPlan) {
            this.showToast('Erro ao criar um plano!');
            return;
        }

        await this.planService.addExercises(
            createdPlan,
            this.choosenExercises.map((item) => {
                return {
                    exerciseId: item.id,
                    exerciseIndex: 0,
                };
            })
        );

        if (this.choosenExercises.length === 0) {
            this.showToast('Não se esqueça de adicionar um exercício!');
            return;
        }

        this.showToast('Plano criado');

        this.router.navigate(['tabs/home/mine']);
    }
}
