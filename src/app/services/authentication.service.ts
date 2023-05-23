import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private supabaseService: SupabaseService) {}

    public async authenticate(email: string, password: string) {
        const { data, error } = await this.supabaseService
            .getClient()
            .auth.signInWithPassword({
                email,
                password,
            });

        return error;
    }

    public async authenticateWithGoogle() {
        const { data, error } = await this.supabaseService
            .getClient()
            .auth.signInWithOAuth({
                provider: 'google',
            });

        console.log('Data: ' + data);
        console.log('Error: ' + error);
    }
}
