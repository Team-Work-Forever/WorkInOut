import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Exercise } from 'src/app/models/exercise.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-play-plan',
    templateUrl: './play-plan.page.html',
    styleUrls: ['./play-plan.page.scss'],
})
export class PlayPlanPage implements OnInit, ViewWillEnter {
    plan: Plan;
    exercises: Exercise[];
    categories: BehaviorSubject<Category[]> = new BehaviorSubject([]);

    currentExercise: number = 0;

    constructor(
        private activeRoute: ActivatedRoute,
        private planService: PlanService
    ) {}

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    async ngOnInit() {
        const planId = this.activeRoute.snapshot.paramMap.get('id');

        this.plan = await this.planService.getPlanOfUserById(planId, {
            userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
        } as User);

        this.categories.next(
            await this.planService.getCategoriesFromPlan(planId)
        );

        this.exercises = await this.planService.getExercisesFromPlanById(
            planId
        );
    }
}
