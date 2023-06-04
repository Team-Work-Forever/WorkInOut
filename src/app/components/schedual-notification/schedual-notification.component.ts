import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MessageManagerService } from 'src/app/services/message-manager.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
    selector: 'schedual-notification',
    templateUrl: './schedual-notification.component.html',
    styleUrls: ['./schedual-notification.component.scss'],
})
export class SchedualNotificationComponent implements OnInit {
    constructor(
        public toastService: ToastService,
        private messageManager: MessageManagerService
    ) {}

    @Input()
    public id: string;

    @Input()
    public isSelected: boolean;

    @Input()
    public title: string = 'Plano 1';

    @Input()
    public startDate: string;

    @Output()
    public eventClick: EventEmitter<{ id: string; isActive: boolean }> =
        new EventEmitter();

    public icon: string;

    public color: string = 'black';

    ngOnInit(): void {
        this.icon = this.isSelected ? 'notifications' : 'notifications-outline';
        this.color = this.isSelected ? 'lightblue' : 'black';
    }

    /**
     * Select or unselect a notification
     */
    toggleButton() {
        this.isSelected = !this.isSelected;
        this.icon = this.isSelected ? 'notifications' : 'notifications-outline';
        this.color = this.isSelected ? 'lightblue' : 'black';
        this.eventClick.emit({
            id: this.id,
            isActive: this.isSelected,
        });
    }

    /**
     * Present a notification
     * @param position
     * @param title
     */
    async presentToast() {
        if (!this.isSelected) {
            await this.toastService.showToast(
                this.messageManager.getMessages().plan.successNotification
                    .UnSelectedPlan,
                'top'
            );
        } else {
            await this.toastService.showToast(
                this.messageManager.getMessages().plan.successNotification
                    .SelectedPlan,
                'top'
            );
        }
    }
}
