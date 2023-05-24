import { Component, OnInit } from '@angular/core';
import { NotificationItem } from 'src/app/interfaces/notification-item.interface';
import { Notification } from 'src/app/models/notification.model';
import { User } from 'src/app/models/user.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-schedule',
    templateUrl: 'schedule.page.html',
    styleUrls: ['schedule.page.scss'],
})
export class SchedulePage implements OnInit {
    public notifications: NotificationItem[];

    constructor(private notificationService: NotificationService) {}

    async ngOnInit() {
        const notifications =
            await this.notificationService.getAllMyNotifications({
                userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
            } as User);

        this.notifications = notifications.map((notification) => {
            return {
                id: notification.id,
                title: notification.title,
                type: notification.type,
                started_at: notification.started_at.toString(),
                ended_at: notification.ended_at.toString(),
                is_active: notification.is_active,
            } as NotificationItem;
        });
    }

    getMinDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const minDate = `${year}-${month}-${day}T00:00:00`;
        return minDate;
    }

    getSelectedDate(event) {
        const selectedDate = event.detail.value;
        const dateParts = selectedDate.split('T')[0].split('-');
        const year = dateParts[0];
        const month = dateParts[1];
        const day = dateParts[2];

        // Agora você pode usar as variáveis 'year', 'month' e 'day' para obter os planos de treino correspondentes a essa data.
        // Você pode chamar outra função aqui para exibir os planos de treino ou manipulá-los de acordo com a sua necessidade.
        console.log('Ano:', year);
        console.log('Mês:', month);
        console.log('Dia:', day);
    }
}
