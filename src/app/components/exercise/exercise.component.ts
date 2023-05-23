import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'exercise',
    templateUrl: './exercise.component.html',
    styleUrls: ['./exercise.component.scss'],
})
export class ExerciseComponent implements OnInit {
    @Input()
    title: string;

    @Input()
    duration: string;

    selected: boolean = false;

    constructor() {}

    ngOnInit() {}

    handleClick() {
        this.selected = !this.selected;
    }
}
