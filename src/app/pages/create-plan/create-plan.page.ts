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
import { Category } from 'src/app/models/category.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-create-plan',
    templateUrl: './create-plan.page.html',
    styleUrls: ['./create-plan.page.scss'],
})
export class CreatePlanPage implements ViewWillEnter {
    planTitle: string = 'Novo Treino';
    choosenExercises: ExerciseItem[] = [];

    sendCategories: BehaviorSubject<Category[]> = new BehaviorSubject([]);
    categories: Category[] = [];
    duration: number = 0;

    constructor(
        public toastController: ToastController,
        private planService: PlanService,
        private activeRoute: ActivatedRoute,
        private categoryService: CategoryService,
        private authenticationService: AuthenticationService,
        private router: Router
    ) {}

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        const info = this.activeRoute.snapshot.paramMap.get('plan');

        const plan =
            info != 'nocontent' ? (JSON.parse(info) as CreateRouteProps) : '';

        if (plan) {
            this.choosenExercises = plan.exercises ? plan.exercises : [];

            if (this.choosenExercises) {
                this.choosenExercises.forEach(
                    (exe, index) => (exe.index = index)
                );

                this.choosenExercises.forEach(async (exe) => {
                    const existingCategory = this.categories.find(
                        (category) => category.id === exe.category
                    );

                    if (existingCategory) {
                        existingCategory.qty += 1;
                    } else {
                        this.categories.push({
                            id: exe.category,
                            qty: 0,
                        } as Category);
                    }
                });
            }

            this.duration = this.choosenExercises.reduce(
                (sum, item) => sum + item.duration,
                0
            );
            this.sendCategories.next(this.categories);
            this.planTitle = plan ? plan.title : 'Novo Plano';
        }
    }

    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
        this.choosenExercises[ev.detail.from].index = ev.detail.to;
        this.choosenExercises = ev.detail.complete(this.choosenExercises);
        this.choosenExercises.forEach((exe, index) => (exe.index = index));
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
                    categories: this.categories,
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

        let bestCategory: Category | null = null;

        this.categories.forEach((cat) => {
            if (!bestCategory || cat.qty > bestCategory.qty) {
                bestCategory = cat;
            }
        });

        const cat = await this.categoryService.getCategoryById(bestCategory.id);

        const createdPlan = await this.planService.createPlan(
            {
                badge: cat.badge,
                color: '#000',
                duration: this.choosenExercises.reduce(
                    (sum, item) => sum + item.duration,
                    0
                ),
                is_favourite: false,
                title: this.planTitle,
            } as Plan,
            this.authenticationService.getAuthUser()
        );

        if (!createdPlan) {
            this.showToast('Erro ao criar um plano!');
            return;
        }

        if (this.choosenExercises.length === 0) {
            this.showToast('Não se esqueça de adicionar um exercício!');
            return;
        }

        await this.planService.addExercises(
            createdPlan,
            this.choosenExercises.map((item) => {
                return {
                    exerciseId: item.id,
                    exerciseIndex: item.index,
                };
            })
        );

        await this.planService.addCategories(
            createdPlan,
            this.categories.map((cat) => {
                return {
                    categoryId: cat.id,
                    qty: cat.qty,
                };
            })
        );

        this.showToast('Plano criado');

        this.router.navigate(['tabs/home/mine']);
    }
}
