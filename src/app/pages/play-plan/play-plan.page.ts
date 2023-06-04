import { Component } from '@angular/core';
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
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-play-plan',
    templateUrl: './play-plan.page.html',
    styleUrls: ['./play-plan.page.scss'],
})
export class PlayPlanPage implements ViewWillEnter {
    public isLoading: boolean = false;

    plan: Plan;
    exercises: Exercise[];
    categories: BehaviorSubject<Category[]> = new BehaviorSubject([]);

    currentExercise: number = 0;
    currentValue: number = 0;
    isPlaying: boolean = false;
    icon: string;

    intervalId: any = null;
    startTime: number = 0;
    endTime: number = 0;
    pausedTime: number = 0;

    constructor(
        private activeRoute: ActivatedRoute,
        private planService: PlanService,
        private authenticationService: AuthenticationService
    ) {}

    async ionViewWillEnter() {
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Present the symbol of loading
        this.isLoading = true;

        // Collect the id of the plan
        const planId = this.activeRoute.snapshot.paramMap.get('id');

        // Get plan of user by id collected
        this.plan = await this.planService.getPlanOfUserById(
            planId,
            this.authenticationService.getAuthUser()
        );

        this.categories.next(
            await this.planService.getCategoriesFromPlan(planId)
        );

        // Get Exercises from plan collected
        this.exercises = await this.planService.getExercisesFromPlanById(
            planId
        );

        // End the loading
        this.isLoading = false;
    }

    /**
     * Make the plan play and stop
     */
    togglePlayback() {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.resumePlayback();
        } else {
            this.pausePlayback();
        }
    }

    /**
     * Make the plan play
     * @returns
     */
    async resumePlayback() {
        if (this.intervalId) {
            return;
        }

        // Define the time of the exercise in the progress bar
        const exercise = this.exercises[this.currentExercise];
        if (this.currentExercise === 0) {
            this.startTime = Date.now();
            this.endTime = this.startTime + exercise.duration * 60000;
        } else {
            this.startTime = Date.now() - this.pausedTime;
            this.endTime = this.startTime + exercise.duration * 60000;
        }

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const progress =
                ((currentTime - this.startTime) /
                    (this.endTime - this.startTime)) *
                100;
            this.currentValue = progress;

            if (currentTime >= this.endTime) {
                clearInterval(this.intervalId);
                this.intervalId = null;
                this.nextExercise();
            }
        }, 100);
    }

    /**
     * Pause the plan
     */
    pausePlayback() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.pausedTime = Date.now() - this.startTime;
        }
    }

    /**
     * Change to the next exercise of the plan
     */
    async nextExercise() {
        this.currentExercise++;
        if (this.currentExercise < this.exercises.length) {
            if (this.isPlaying) {
                await this.resumePlayback();
            }
        } else {
            this.isPlaying = false;
        }
        this.currentValue = 0;
    }
}
