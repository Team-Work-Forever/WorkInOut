import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import { Plan } from '../models/plan.model';
import { Exercise } from '../models/exercise.model';

type CreatePlanProps = {
    plan_badge: string;
    plan_duration: number;
    plan_title: string;
    plan_color: string;
    plan_is_favorite: boolean;
    user_id: string;
};

type AddExerciseProps = {
    exercise_id: string;
    exercise_index: number;
    plan_id: string;
};

type ChangeFavProps = {
    plan_id: string;
    user_id: string;
    is_fav: boolean;
};

@Injectable({
    providedIn: 'root',
})
export class PlanService {
    constructor(private supabaseService: SupabaseService) {}

    public async getAllPlanOfUser(user: User): Promise<Plan[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan_user')
            .select('*')
            .eq('auth_user', user.userId);

        if (error) {
            return [];
        }

        return data as Plan[];
    }

    public async getAllPlanOfUserFavorite(user: User): Promise<Plan[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan_user')
            .select('*')
            .eq('is_favourite', true);

        if (error) {
            return [];
        }

        return data as Plan[];
    }

    public async updatePlan(plan: Plan, user: User): Promise<void> {
        const { data, error } = await this.supabaseService
            .getClient()
            .rpc('func_change_fav', {
                user_id: user.userId,
                plan_id: plan.id,
                is_fav: plan.is_favourite,
            } as ChangeFavProps);

        console.log(error);
    }

    public async createPlan(plan: Plan, user: User): Promise<Plan> {
        const { data, error } = await this.supabaseService
            .getClient()
            .rpc('func_insert_plan', {
                plan_badge: plan.badge,
                plan_color: plan.color,
                plan_duration: plan.duration,
                plan_is_favorite: plan.is_favourite,
                plan_title: plan.title,
                user_id: user.userId,
            } as CreatePlanProps)
            .single();

        if (error) return {} as Plan;

        plan.id = data as string;
        return plan;
    }

    public async addExercises(
        plan: Plan,
        exercises: Exercise[]
    ): Promise<void> {
        await Promise.all(
            exercises.map((exercise) => this.addExercise(plan, exercise))
        );
    }

    public async addExercise(plan: Plan, exercise: Exercise): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_add_exe', {
                exercise_id: exercise.id,
                exercise_index: exercise.index,
                plan_id: plan.id,
            } as AddExerciseProps);
    }
}
