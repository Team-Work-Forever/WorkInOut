import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'flag-displayer',
    templateUrl: './flag-displayer.component.html',
    styleUrls: ['./flag-displayer.component.scss'],
})
export class FlagDisplayerComponent implements OnInit {
    constructor() {}

    @Input()
    hasAgenda: boolean = false;

    @Output()
    open: EventEmitter<any> = new EventEmitter();

    ngOnInit() {}

    openSchedule() {
        this.open.emit();
    }
}
