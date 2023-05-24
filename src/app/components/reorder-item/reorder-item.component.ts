import { Component, Input, OnInit } from '@angular/core';
import { convertToMinutesSeconds } from 'src/utils/time-date.utils';

@Component({
    selector: 'reorder-item',
    templateUrl: './reorder-item.component.html',
    styleUrls: ['./reorder-item.component.scss'],
})
export class ReorderItemComponent implements OnInit {
    duration: string;

    @Input()
    public title: string;

    @Input()
    public time: number;

    constructor() {}

    ngOnInit() {
        this.duration = convertToMinutesSeconds(this.time).concat(' min');
    }
}
