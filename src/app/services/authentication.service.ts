import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { User } from '../models/user.model';
import { AuthError } from '@supabase/supabase-js';
import { AppStorageService } from './app-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private readonly AUTH_API_KEY: string = 'auth_info';
    private authUser: User;
    private access_token: string;

    constructor(
        private supabaseService: SupabaseService,
        private storage: AppStorageService
    ) {
        this.init();
    }

    async init() {
        this.authUser = JSON.parse(
            await this.storage.getValue(this.AUTH_API_KEY)
        );
    }

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
        await this.storage.setValue(
            this.AUTH_API_KEY,
            JSON.stringify(this.authUser)
        );

        return null;
    }

    public async isAuthenticated(): Promise<boolean> {
        return !!(await this.storage.getValue<User>(this.AUTH_API_KEY));
    }

    public getAuthUser(): User {
        return this.authUser;
    }

    public async logOut() {
        this.authUser = null;
        await this.storage.removeValue(this.AUTH_API_KEY);
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
