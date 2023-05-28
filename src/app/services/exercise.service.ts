import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Exercise } from '../models/exercise.model';

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

    public async getFilteredExercicies(
        categoryindices: string[]
    ): Promise<Exercise[]> {
        console.log(categoryindices);

        const { data: exercises, error } = await this.supabaseService
            .getClient()
            .rpc('getfilteredexercices', {
                categoryindices,
            });

        console.log(exercises);

        if (error) {
            return [];
        }

        return exercises;
    }
}
