import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import { AuthError } from '@supabase/supabase-js';
import { AppStorageService } from './app-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private authUser: User;
    private access_token: string;

    constructor(
        private supabaseService: SupabaseService,
        private storage: AppStorageService
    ) {}

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

        await this.storage.setValue('auth_info', JSON.stringify(this.authUser));

        return null;
    }

    public async isAuthenticated(): Promise<boolean> {
        this.authUser = await this.storage.getValue<User>('auth_info');
        console.log(this.authUser);

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
