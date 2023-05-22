import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'schedual-notification',
    templateUrl: './schedual-notification.component.html',
    styleUrls: ['./schedual-notification.component.scss'],
})
export class SchedualNotificationComponent implements OnInit {
    constructor() {}

    public isSelected: boolean;

    public icon: string;

    public color: string = 'black';

    ngOnInit(): void {
        this.toggleButton();
    }

    toggleButton() {
        this.isSelected = !this.isSelected;
        this.icon = !this.isSelected
            ? 'notifications'
            : 'notifications-outline';
        this.color = !this.isSelected ? 'lightblue' : 'black';
    }
}
