import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'flat-button',
    templateUrl: './flat-button.component.html',
    styleUrls: ['./flat-button.component.scss'],
})
export class FlatButtonComponent implements OnInit {
    constructor() {}

    @Input()
    public bgColor: string;

    @Output()
    public eventClick: EventEmitter<any> = new EventEmitter();

    handleClick() {
        this.eventClick.emit();
    }

    ngOnInit() {}
}
