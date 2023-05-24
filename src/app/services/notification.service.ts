import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Notification } from '../models/notification.model';
import { type } from 'os';
import { User } from '../models/user.model';

type AddNotificationProps = {
    user_id: string;
    title: string;
    type: number;
    is_active: boolean;
};

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private supabaseService: SupabaseService) {}

    public async addNotification(notification: Notification): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_add_notification', {
                user_id: notification.user_id,
                title: notification.title,
                type: notification.type,
                is_active: notification.is_active,
            } as AddNotificationProps);
    }

    public async getAllMyNotifications(user: User): Promise<Notification[]> {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('notification')
            .select('*')
            .eq('auth', user.userId);

        if (error) return [];

        return data as Notification[];
    }
}
