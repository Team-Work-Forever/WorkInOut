import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'text-field',
    templateUrl: './text-field.component.html',
    styleUrls: ['./text-field.component.scss'],
})
export class TextFieldComponent implements OnInit {
    @Input()
    @Output()
    public value: string;

    constructor() {}

    ngOnInit() {}
}
