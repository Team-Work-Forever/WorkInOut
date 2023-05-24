import { Component, Input, OnInit } from '@angular/core';
import { convertToMinutesSeconds } from 'src/utils/time-date.utils';

@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
    displayer: string;

    @Input()
    title: string;

    @Input()
    duration: number;

    @Input()
    ignoreSelect: boolean = false;

    selected: boolean = false;

    constructor() {}

    ngOnInit() {
        this.displayer = convertToMinutesSeconds(this.duration).concat(' min');
    }

    handleClick() {
        this.selected = !this.selected;
    }
}
