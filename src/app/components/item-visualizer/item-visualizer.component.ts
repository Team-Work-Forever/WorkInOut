import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { convertToMinutesSeconds } from 'src/utils/time-date.utils';

@Component({
    selector: 'item-visualizer',
    templateUrl: './item-visualizer.component.html',
    styleUrls: ['./item-visualizer.component.scss'],
})
export class ItemVisualizerComponent implements OnInit {
    displayer: string;

    @Input()
    rangeValue: number = 50;

    constructor() {}

    @Input()
    public isOpen: boolean = false;

    @Input()
    public title: string;

    @Input()
    public duration: number;

    @Output()
    public onValueChanged: EventEmitter<number> = new EventEmitter();

    onIonChange(event) {
        this.onValueChanged.emit(event);
    }

    ngOnInit() {
        console.log(this.duration);

        this.displayer = convertToMinutesSeconds(this.duration).concat(' min');
    }
}
