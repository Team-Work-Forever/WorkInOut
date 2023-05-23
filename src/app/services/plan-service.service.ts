import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import { Plan } from '../models/plan.model';

type CreatePlanProps = {
    plan_badge: string;
    plan_duration: number;
    plan_title: string;
    plan_color: string;
    plan_is_favorite: boolean;
    user_id: string;
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
            .eq('is_favourite', true)
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

    public async createPlan(plan: Plan, user: User): Promise<void> {
        const {} = await this.supabaseService
            .getClient()
            .rpc('func_insert_plan', {
                plan_badge: plan.badge,
                plan_color: plan.color,
                plan_duration: plan.duration,
                plan_is_favorite: plan.is_favourite,
                plan_title: plan.title,
                user_id: user.userId,
            } as CreatePlanProps);
    }
}
