import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Exercise } from '../models/exercise.model';

@Injectable({
    providedIn: 'root',
})
export class ExerciseService {
    constructor(private supabaseService: SupabaseService) {}

    /**
     * Get All Exercices
     * @returns Promise\<Exercise[]\>
     */
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

    /**
     * Get FielteredExercices by category indexing
     * @param categoryindices
     * @returns Promise\<Exercise[]\>
     */
    public async getFilteredExercicies(
        categoryindices: string[]
    ): Promise<Exercise[]> {
        const { data: exercises, error } = await this.supabaseService
            .getClient()
            .rpc('getfilteredexercices', {
                categoryindices,
            });

        if (error) {
            return [];
        }

        return exercises;
    }
}
