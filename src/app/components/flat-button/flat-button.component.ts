import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'flat-button',
    templateUrl: './flat-button.component.html',
    styleUrls: ['./flat-button.component.scss'],
})
export class FlatButtonComponent implements OnInit {
    constructor() {}

    @Input()
    public bgColor: string;

    ngOnInit() {}
}
