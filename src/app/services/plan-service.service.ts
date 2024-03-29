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

    /**
     * Get All Plan of and given User
     * @param user
     * @returns Promise\<Plan[]\>
     */
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

    /**
     * Get All Plans Of an given User, with filter categories
     * @param param0
     * @param categoryindices
     * @returns Promise\<Plan[]\>
     */
    public async getAllPlanOfUserFilterWithCategories(
        { userId: user_id }: User,
        categoryindices: string[]
    ): Promise<Plan[]> {
        const { data: plans, error } = await this.supabaseService
            .getClient()
            .rpc('getfilteredplans', {
                categoryindices,
                user_id,
            });

        if (error) {
            return [];
        }

        return plans;
    }

    /**
     * Get Plan of an given User id
     * @param planId
     * @param user
     * @returns Promise\<Plan\>
     */
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

    /**
     * Get Plan by id
     * @param planId
     * @returns Promise\<Plan\>
     */
    public async getPlanById(planId: string): Promise<Plan> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan')
            .select('*')
            .eq('id', planId)
            .single();

        if (error) {
            return {} as Plan;
        }

        return data as Plan;
    }

    /**
     * Get All Favourite Plan of an User
     * @param user
     * @returns Promise\<Plan[]\>
     */
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

    /**
     * Get All Recommended Plans
     * @returns Promise\<Plan[]\>
     */
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

    /**
     * Get Popular Plans
     * @returns Promise\<Plan[]\>
     */
    public async getAllPopularPlan(): Promise<Plan[]> {
        return await this.getAllRecomendedPlan();
    }

    /**
     * Get Categories from an given plan id
     * @param planId
     * @returns Promise\<number\>
     */
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

        return 0;
    }

    /**
     * Delete Plan of an given plan id
     * @param planId
     * @returns Promise\<PostgrestError\>
     */
    public async deletePlan(planId: string): Promise<PostgrestError> {
        const { error } = await this.supabaseService
            .getClient()
            .from('public_plan')
            .delete()
            .eq('plan', planId);

        return error;
    }

    /**
     * Change favourite of an user plan
     * @param plan
     * @param user
     */
    public async changeFav(plan: Plan, user: User): Promise<void> {
        const { data, error } = await this.supabaseService
            .getClient()
            .rpc('func_change_fav', {
                user_id: user.userId,
                plan_id: plan.id,
                is_fav: plan.is_favourite,
            } as ChangeFavProps);
    }

    /**
     * Create an Plan
     * @param plan
     * @param user
     * @returns Promise\<Plan\>
     */
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

    /**
     * Add Exercises to an plan
     * @param plan
     * @param exercises
     */
    public async addExercises(
        plan: Plan,
        exercises: { exerciseId: string; exerciseIndex: number }[]
    ): Promise<void> {
        await Promise.all(
            exercises.map((exercise) => this.addExercise(plan, exercise))
        );
    }

    /**
     * Add Exercise to an plan
     * @param plan
     * @param param1
     */
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

    /**
     * Remove Exercise of an given plan
     * @param plan
     * @param exercises
     */
    public async removeExercises(
        plan: Plan,
        exercises: { exerciseId: string }[]
    ): Promise<void> {
        await Promise.all(
            exercises.map((exercise) => this.removeExercise(plan, exercise))
        );
    }

    /**
     * Remove Exercise of an plan
     */
    public async removeExercise(plan: Plan, { exerciseId }): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .from('exercise_plan')
            .delete()
            .eq('plan', plan.id)
            .eq('exercise', exerciseId);
    }

    /**
     * Add Category to plan
     * @param plan
     * @param categories
     */
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

    /**
     * Add Category to plan
     * @param plan
     * @param param1
     * @returns
     */
    public async addCategory(
        plan: Plan,
        { categoryId, qty }
    ): Promise<PostgrestError> {
        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_add_cat', {
                plan_id: plan.id,
                category_id: categoryId,
                category_qty: qty,
            } as AddCategoryProps);

        return error;
    }

    /**
     * Get Categories from an given plan id
     * @param planId
     * @returns Promise\<Category[]\>
     */
    public async getCategoriesFromPlan(planId: string): Promise<Category[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('cat_only')
            .select('*')
            .eq('plan', planId);

        if (error) return [];

        return data as Category[];
    }

    /**
     * Get Exercises from an given plan id
     * @param planId
     * @returns Promise\<Exercise[]\>
     */
    public async getExercisesFromPlanById(planId: string): Promise<Exercise[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('exe_info')
            .select('*')
            .eq('plan', planId)
            .order('index', { ascending: true });

        if (error) {
            return [];
        }

        return data as Exercise[];
    }
}
