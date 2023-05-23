import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Plan } from '../models/plan.model';

@Injectable({
    providedIn: 'root',
})
export class PlanService {
    constructor(private supabaseService: SupabaseService) {}

    public async getAllPlans(): Promise<Plan[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan')
            .select('*');

        if (error) {
            return [];
        }

        return data as Plan[];
    }

    public async getPlanById(uuid: string): Promise<Plan> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan')
            .select('*')
            .eq('id', uuid)
            .single();

        if (error) {
            return {} as Plan;
        }

        return data as Plan;
    }

    public async updatePlan(plan: Plan) {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('plan')
            .update(plan)
            .eq('id', plan.id)
            .single();

        if (error) {
            return {} as Plan;
        }

        return data as Plan;
    }
}
