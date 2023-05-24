import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Exercise } from '../models/exercise.model';
import { Category } from '../models/category.model';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    constructor(private supabaseService: SupabaseService) {}

    public async getAllExercises(): Promise<Exercise[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('exercise')
            .select('*');

        if (error) {
            return [];
        }

        return data as Exercise[];
    }
}
