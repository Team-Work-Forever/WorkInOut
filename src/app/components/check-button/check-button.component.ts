import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'check-button',
    templateUrl: './check-button.component.html',
    styleUrls: ['./check-button.component.scss'],
})
export class CheckButtonComponent implements OnInit {
    @Input()
    public isChecked: boolean = false;

    @Input()
    public content: string = 'Todos';

    @Input()
    public mainColor: string = '#9324C1';

    constructor() {}

    ngOnInit() {}

    handleClick() {
        this.isChecked = !this.isChecked;
    }
}
