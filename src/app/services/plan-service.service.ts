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

    public async getPlanOfUserById(planId: string, user: User): Promise<Plan> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan_user')
            .select('*')
            .eq('id', planId)
            .eq('auth_user', user.userId)
            .single();

        if (error) {
            return {} as Plan;
        }

        return data as Plan;
    }

    public async getAllPlanOfUserFavorite(user: User): Promise<Plan[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan_user')
            .select('*')
            .eq('auth_user', user.userId)
            .eq('is_favourite', true);

        if (error) {
            return [];
        }

        return data as Plan[];
    }

    public async getAllRecomendedPlan(): Promise<Plan[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan')
            .select('*');

        if (error) {
            return [];
        }

        return data as Plan[];
    }

    public async getAllPopularPlan(): Promise<Plan[]> {
        return await this.getAllRecomendedPlan();
    }

    public async changeFav(plan: Plan, user: User): Promise<void> {
        const { data, error } = await this.supabaseService
            .getClient()
            .rpc('func_change_fav', {
                user_id: user.userId,
                plan_id: plan.id,
                is_fav: plan.is_favourite,
            } as ChangeFavProps);
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
        exercises: { exerciseId: string; exerciseIndex: number }[]
    ): Promise<void> {
        await Promise.all(
            exercises.map((exercise) => this.addExercise(plan, exercise))
        );
    }

    public async addExercise(
        plan: Plan,
        { exerciseId, exerciseIndex }
    ): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_add_exe', {
                exercise_id: exerciseId,
                exercise_index: exerciseIndex,
                plan_id: plan.id,
            } as AddExerciseProps);
    }

    public async getExercisesFromPlanById(planId: string): Promise<Exercise[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('exe_info')
            .select('*')
            .eq('plan', planId);

        if (error) {
            return [];
        }

        return data as Exercise[];
    }
}
