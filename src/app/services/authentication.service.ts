import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import { AuthError } from '@supabase/supabase-js';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private authUser: User;
    private access_token: string;

    constructor(private supabaseService: SupabaseService) {}

    public async authenticate(
        email: string,
        password: string
    ): Promise<AuthError> {
        const { data, error } = await this.supabaseService
            .getClient()
            .auth.signInWithPassword({
                email,
                password,
            });

        if (error) return error;

        this.authUser = {
            userId: data.user.id,
            email: data.user.email,
        } as User;

        this.access_token = data.session.access_token;
        console.log(this.access_token);

        return null;
    }

    public isAuthenticated(): boolean {
        return this.authUser != null;
    }

    public getAuthUser(): User {
        return this.authUser;
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
