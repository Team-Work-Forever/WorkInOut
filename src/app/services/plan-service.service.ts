import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import { Plan } from '../models/plan.model';
import { Exercise } from '../models/exercise.model';
import { PostgrestError } from '@supabase/supabase-js';
import { Category } from '../models/category.model';

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

type AddCategoryProps = {
    plan_id: string;
    category_id: string;
    category_qty: number;
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

    public async getCaloriesFromPlan(planId: string): Promise<number> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('exercise_plan')
            .select('exercises(calories)')
            .eq('plan', planId);

        if (error) {
            // Handle the error
            return 0;
        }

        // let totalCalories = 0;

        // if (data && data.length > 0) {
        //     for (const exercisePlan of data) {
        //         if (
        //             exercisePlan.exercises &&
        //             exercisePlan.exercises.length > 0
        //         ) {
        //             for (const exercise of exercisePlan.exercises) {
        //                 if (exercise.calories) {
        //                     totalCalories += exercise.calories;
        //                 }
        //             }
        //         }
        //     }
        // }

        return 0;
    }

    public async deletePlan(planId: string): Promise<PostgrestError> {
        const { error } = await this.supabaseService
            .getClient()
            .from('public_plan')
            .delete()
            .eq('plan', planId);

        return error;
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

    public async removeExercises(
        plan: Plan,
        exercises: { exerciseId: string }[]
    ): Promise<void> {
        await Promise.all(
            exercises.map((exercise) => this.removeExercise(plan, exercise))
        );
    }

    public async removeExercise(plan: Plan, { exerciseId }): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .from('exercise_plan')
            .delete()
            .eq('plan', plan.id)
            .eq('exercise', exerciseId);

        console.log(error);
    }

    public async addCategories(
        plan: Plan,
        categories: { categoryId: string; qty: number }[]
    ): Promise<void> {
        await Promise.all(
            categories.map((category) =>
                this.addCategory(plan, {
                    categoryId: category.categoryId,
                    qty: category.qty,
                })
            )
        );
    }

    public async addCategory(
        plan: Plan,
        { categoryId, qty }
    ): Promise<PostgrestError> {
        console.log('Ola=' + qty);

        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_add_cat', {
                plan_id: plan.id,
                category_id: categoryId,
                category_qty: qty,
            } as AddCategoryProps);

        console.log(error);

        return error;
    }

    public async getCategoriesFromPlan(planId: string): Promise<Category[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('cat_only')
            .select('*')
            .eq('plan', planId);

        if (error) return [];

        return data as Category[];
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
