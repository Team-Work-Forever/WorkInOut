import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'reorder-item',
    templateUrl: './reorder-item.component.html',
    styleUrls: ['./reorder-item.component.scss'],
})
export class ReorderItemComponent implements OnInit {
    @Input()
    public title: string;

    @Input()
    public time: string;

    constructor() {}

    ngOnInit() {}
}
