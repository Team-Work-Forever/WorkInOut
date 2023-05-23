import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'flag-displayer',
    templateUrl: './flag-displayer.component.html',
    styleUrls: ['./flag-displayer.component.scss'],
})
export class FlagDisplayerComponent implements OnInit {
    constructor() {}

    @Input()
    hasAgenda: boolean = false;

    ngOnInit() {}
}
