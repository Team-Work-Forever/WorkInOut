import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ItemReorderEventDetail, ViewWillEnter } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CreateRouteProps } from 'src/app/interfaces/create-route.interface';
import { ExerciseItem } from 'src/app/interfaces/exercise-item.interface';
import { Category } from 'src/app/models/category.model';
import { Plan } from 'src/app/models/plan.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CategoryService } from 'src/app/services/category.service';
import { MessageManagerService } from 'src/app/services/message-manager.service';
import { PlanService } from 'src/app/services/plan-service.service';
import { ToastService } from 'src/app/services/toast.service';

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
        private planService: PlanService,
        private activeRoute: ActivatedRoute,
        private categoryService: CategoryService,
        private authenticationService: AuthenticationService,
        private toastService: ToastService,
        private messageManager: MessageManagerService,
        private router: Router
    ) {}

    async ionViewWillEnter() {
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Collect the id of the plan
        const info = this.activeRoute.snapshot.paramMap.get('plan');

        // If route paramter is 'nocontent' ignore the value else accepts the paramter value
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

            // Change the duration of the plan by the exercises choosen
            this.duration = this.choosenExercises.reduce(
                (sum, item) => sum + item.duration,
                0
            );
            this.sendCategories.next(this.categories);

            // If the user don't give any title to the plan, the plan is crated with title 'Novo Plano'
            this.planTitle = plan ? plan.title : 'Novo Plano';
        }
    }

    /**
     * Reorder exercises
     * @param ev
     */
    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
        this.choosenExercises[ev.detail.from].index = ev.detail.to;
        this.choosenExercises = ev.detail.complete(this.choosenExercises);
        this.choosenExercises.forEach((exe, index) => (exe.index = index));
    }

    /**
     * Change title of the plan
     * @param event
     */
    planTitleChanged(event: string) {
        this.planTitle = event;
    }

    /**
     * Send the user to the page where he can add exercises to his plan
     */
    addExercise() {
        this.router.navigate(
            [
                '/tabs/home/mine/add/' +
                    JSON.stringify({
                        title: this.planTitle,
                        exercises: this.choosenExercises,
                        categories: this.categories,
                    } as CreateRouteProps),
            ],
            {
                skipLocationChange: true,
                replaceUrl: true,
            }
        );
    }

    /**
     * Create a plan
     * @returns
     */
    async createPlan() {
        if (this.planTitle.length === 0) {
            this.toastService.showToast(
                this.messageManager.getMessages().plan.failNotification
                    .FailToSavePlan
            );
            return;
        }

        if (this.choosenExercises.length === 0) {
            this.toastService.showToast(
                this.messageManager.getMessages().plan.failNotification
                    .AddExercise
            );
            return;
        }

        let bestCategory: Category | null = null;

        // Tries to collect the Category with more quantity of exercices
        this.categories.forEach((cat) => {
            if (!bestCategory || cat.qty > bestCategory.qty) {
                bestCategory = cat;
            }
        });

        const cat = await this.categoryService.getCategoryById(bestCategory.id);

        // Create's an plan with the sum of the duration of the exercises added to the plan
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
            this.toastService.showToast(
                this.messageManager.getMessages().plan.failNotification
                    .ErrorCreatingPlan
            );
            return;
        }

        if (this.choosenExercises.length === 0) {
            this.toastService.showToast(
                this.messageManager.getMessages().plan.failNotification
                    .NecessaryToAddPlan
            );
            return;
        }

        // Add Exercises to the plan
        await this.planService.addExercises(
            createdPlan,
            this.choosenExercises.map((item) => {
                return {
                    exerciseId: item.id,
                    exerciseIndex: item.index,
                };
            })
        );

        // Add Categories to the plan
        await this.planService.addCategories(
            createdPlan,
            this.categories.map((cat) => {
                return {
                    categoryId: cat.id,
                    qty: cat.qty,
                };
            })
        );

        this.toastService.showToast(
            this.messageManager.getMessages().plan.successNotification
                .CreatePlan
        );

        // When plan created the user is send to my plans page
        this.router.navigate(['tabs/home/mine'], {
            skipLocationChange: true,
            replaceUrl: true,
        });
    }
}
