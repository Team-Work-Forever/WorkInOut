import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

interface Exercicio {
    name: string;
}

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    private supabaseClient: SupabaseClient;

    constructor() {
        this.supabaseClient = createClient(
            'https://qbkliymokbvleuaxyiwn.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFia2xpeW1va2J2bGV1YXh5aXduIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ4MzQyOTMsImV4cCI6MjAwMDQxMDI5M30.hJSTjvvVYKh_7kV_PvKppGUkb6cLPdUPzhdI0GBAHe0'
        );
    }

    /**
     * Get the Supabase Client
     * @returns SupabaseClient
     */
    public getClient(): SupabaseClient {
        return this.supabaseClient;
    }
}
