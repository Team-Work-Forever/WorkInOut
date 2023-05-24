export interface Notification {
    id: string;
    title: string;
    type: number;
    is_active: boolean;
    user_id?: string;
    started_at?: string;
    ended_at?: string;
}
