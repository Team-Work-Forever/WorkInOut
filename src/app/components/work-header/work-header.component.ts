import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/interfaces/card.inteface';

@Component({
    selector: 'app-work-header',
    templateUrl: './work-header.component.html',
    styleUrls: ['./work-header.component.scss'],
})
export class WorkHeaderComponent implements OnInit {
    @Input()
    arrayList: Card[];

    @Input()
    isNested: boolean = false;

    @Input()
    title: string = 'Novo Treino';

    @Input()
    editable: boolean = false;

    @Input()
    search: boolean = true;

    @Output()
    result: EventEmitter<Card[]> = new EventEmitter<Card[]>();

    constructor() {}

    ngOnInit() {
        if (this.editable) {
        }
    }

    handleChange(event: any) {
        const searchTerm = event.target.value;
        if (searchTerm && searchTerm.trim() !== '') {
            const filteredResults = this.arrayList.filter((card) => {
                return (
                    card.title
                        .toLowerCase()
                        .indexOf(searchTerm.toLowerCase()) !== -1
                );
            });
            this.result.emit(filteredResults);
        } else {
            this.result.emit(this.arrayList);
        }
    }
}
