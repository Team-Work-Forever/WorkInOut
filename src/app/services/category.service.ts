import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Plan } from '../models/plan.model';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private supabaseService: SupabaseService) {}

    public async getAllCategories(): Promise<Category[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('category')
            .select('*');

        if (error) {
            return [];
        }

        return data as Category[];
    }

    public async getCategoryByTitle(title: string): Promise<Category> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('category')
            .select('*')
            .eq('title', title)
            .single();

        if (error) return {} as Category;

        return data as Category;
    }

    public async associateCategoryToPlan(
        category: Category,
        plan: Plan
    ): Promise<boolean> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('category')
            .insert({
                plan,
                category,
            })
            .single();

        if (error) {
            return false;
        }

        return data != null;
    }
}
