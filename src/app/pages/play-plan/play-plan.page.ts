import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { Exercise } from 'src/app/models/exercise.model';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-play-plan',
    templateUrl: './play-plan.page.html',
    styleUrls: ['./play-plan.page.scss'],
})
export class PlayPlanPage implements ViewWillEnter {
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
        private toastController: ToastController,
        private authenticationService: AuthenticationService
    ) {}

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        const planId = this.activeRoute.snapshot.paramMap.get('id');

        this.plan = await this.planService.getPlanOfUserById(
            planId,
            this.authenticationService.getAuthUser()
        );

        this.categories.next(
            await this.planService.getCategoriesFromPlan(planId)
        );

        this.exercises = await this.planService.getExercisesFromPlanById(
            planId
        );
    }

    playPlan() {
        this.isPlaying = !this.isPlaying;
        this.presentToast(
            'top',
            this.isPlaying
                ? 'Execução do plano, colocado em pausa'
                : 'O plano está a decorrer'
        );
    }

    async presentToast(position, title) {
        const toast = await this.toastController.create({
            message: title,
            duration: 2000,
            position: position,
        });
        toast.present();
    }

    togglePlayback() {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.resumePlayback();
        } else {
            this.pausePlayback();
        }
    }

    async resumePlayback() {
        if (this.intervalId) {
            return;
        }

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

    pausePlayback() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.pausedTime = Date.now() - this.startTime;
        }
    }

    async nextExercise() {
        this.currentExercise++;
        if (this.currentExercise < this.exercises.length) {
            if (this.isPlaying) {
                await this.resumePlayback();
            }
        } else {
            console.log('Exercise sequence completed.');
            this.isPlaying = false;
        }
        this.currentValue = 0;
    }
}
