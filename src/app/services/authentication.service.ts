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

    constructor(
        private supabaseService: SupabaseService,
        private storage: AppStorageService
    ) {
        this.init();
    }

    /**
     * Get the value of previous user authenticated
     */
    async init() {
        this.authUser = JSON.parse(
            await this.storage.getValue(this.AUTH_API_KEY)
        );
    }

    /**
     * Authenticate with email and password, using Supabase Authentication Service
     * @param email
     * @param password
     * @returns Promise\<AuthError\> authentication error
     */
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

        // Persist the value in Ionic Storage
        await this.storage.setValue(
            this.AUTH_API_KEY,
            JSON.stringify(this.authUser)
        );

        return null;
    }

    /**
     * Verifies if user if authenticated
     * @returns Promisse\<boolean\> true or false if user is authenticated
     */
    public async isAuthenticated(): Promise<boolean> {
        return !!(await this.storage.getValue<User>(this.AUTH_API_KEY));
    }

    /**
     * Get Authenticated User
     * @returns User
     */
    public getAuthUser(): User {
        return this.authUser;
    }

    /**
     * Logs out an User
     */
    public async logOut() {
        this.authUser = null;
        await this.storage.removeValue(this.AUTH_API_KEY);
    }
}
