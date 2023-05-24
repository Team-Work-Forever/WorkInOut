import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Hint } from '../interfaces/hint.interface';
import { User } from '../models/user.model';

type AddHint = {
    user_id: string;
    hint_id: number;
};

@Injectable({
    providedIn: 'root',
})
export class HintServiceService {
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

    public async getAllMyHints(user: User): Promise<Hint[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('my_hint')
            .select('*')
            .eq('auth_user', user.userId);

        if (error) {
            return [];
        }

        return data as Hint[];
    }

    public async addMyHint(user: User, hint: Hint): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_add_my_hint', {
                user_id: user.userId,
                hint_id: hint.id,
            } as AddHint);

        console.log(error);
    }

    public async removeHintFromMyHints(user: User, hint: Hint): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .from('my_hint')
            .delete()
            .eq('hint', hint.id);

        console.log(error);
    }
}
