import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Hint } from '../interfaces/hint.interface';

type AddHint = {
    user_id: string;
    hint_id: string;
};

@Injectable({
    providedIn: 'root',
})
export class HintService {
    constructor(private supabaseService: SupabaseService) {}

    public async getAllHints(): Promise<Hint[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('hint')
            .select('*');

        if (error) {
            return [];
        }

        return data as Hint[];
    }
}
