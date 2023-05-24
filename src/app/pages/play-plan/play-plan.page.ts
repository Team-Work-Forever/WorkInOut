import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-play-plan',
    templateUrl: './play-plan.page.html',
    styleUrls: ['./play-plan.page.scss'],
})
export class PlayPlanPage implements OnInit {
    plan: Plan;
    exercises: Exercise[];

    currentExercise: number = 0;

    constructor(
        private activeRoute: ActivatedRoute,
        private planService: PlanService
    ) {}

    async ngOnInit() {
        const planId = this.activeRoute.snapshot.paramMap.get('id');

        this.plan = await this.planService.getPlanOfUserById(planId, {
            userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
        } as User);

        this.exercises = await this.planService.getExercisesFromPlanById(
            planId
        );
    }
}
