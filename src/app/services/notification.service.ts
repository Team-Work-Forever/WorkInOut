import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Notification } from '../models/notification.model';
import { User } from '../models/user.model';

type AddNotificationProps = {
    user_id: string;
    title: string;
    type: number;
    is_active: boolean;
    ended_at: string;
};

type SwitchNotificationProps = {
    notification_id: string;
    notification_is_active: boolean;
};

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    constructor(private supabaseService: SupabaseService) {}

    /**
     * Add Notification into Supabase Backend
     * @param notification
     */
    public async addNotification(notification: Notification): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_add_notification', {
                user_id: notification.user_id,
                title: notification.title,
                type: notification.type,
                is_active: notification.is_active,
                ended_at: notification.ended_at,
            } as AddNotificationProps);
    }

    /**
     * Switch the state of an given notification id, to isActive or !isActive
     * @param notification_id
     * @param is_active
     */
    public async switchNotification(
        notification_id: string,
        is_active: boolean
    ): Promise<void> {
        const { error } = await this.supabaseService
            .getClient()
            .rpc('func_switch_notification', {
                notification_id: notification_id,
                notification_is_active: is_active,
            } as SwitchNotificationProps);
    }

    /**
     * Get All My Notifications of and given User and date
     * @param user
     * @param date
     * @returns Promise\<Notification[]\>
     */
    public async getAllMyNotifications(
        user: User,
        date: string
    ): Promise<Notification[]> {
        const startDateTime = `${date}T00:00:00`;
        const endDateTime = `${date}T23:59:59`;

        const { data, error } = await this.supabaseService
            .getClient()
            .from('notification')
            .select('*')
            .eq('auth', user.userId)
            .gte('ended_at', startDateTime)
            .lt('ended_at', endDateTime);

        if (error) return [];

        return data as Notification[];
    }
}
