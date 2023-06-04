import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Plan } from '../models/plan.model';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private supabaseService: SupabaseService) {}

    /**
     * Get All Categories
     * @returns Promisse\<Category[]\>
     */
    public async getAllCategories(): Promise<Category[]> {
        const { data, error, status } = await this.supabaseService
            .getClient()
            .from('category')
            .select('*');

        if (error) {
            return [];
        }

        return data as Category[];
    }

    /**
     * Get Category of an given id
     * @param categoryId
     * @returns Promisse\<Category\>
     */
    public async getCategoryById(categoryId: string): Promise<Category> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('category')
            .select('*')
            .eq('id', categoryId)
            .single();

        if (error) return {} as Category;

        return data as Category;
    }

    /**
     * Get Category by given title
     * @param title
     * @returns Promisse\<Category\>
     */
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

    /**
     * Associate Category to a given Plan
     * @param category
     * @param plan
     * @returns Promisse\<boolean\>
     */
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
