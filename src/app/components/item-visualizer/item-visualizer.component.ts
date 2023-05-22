import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'item-visualizer',
    templateUrl: './item-visualizer.component.html',
    styleUrls: ['./item-visualizer.component.scss'],
})
export class ItemVisualizerComponent implements OnInit {
    constructor() {}

    @Input()
    public isOpen: boolean = false;

    ngOnInit() {}

    handleClick() {
        this.isOpen = !this.isOpen;
    }
}
