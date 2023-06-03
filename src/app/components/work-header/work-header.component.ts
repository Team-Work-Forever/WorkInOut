import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    noContent: boolean = false;

    @Input()
    search: boolean = true;

    @Input()
    backUrl: string = '#';

    @Output()
    result: EventEmitter<Card[]> = new EventEmitter<Card[]>();

    @Output()
    editValue: EventEmitter<string> = new EventEmitter<string>();

    @Output()
    searchHints: EventEmitter<string> = new EventEmitter<string>();

    constructor(private router: Router) {}

    ngOnInit() {
        if (this.editable) {
        }
    }

    /**
     * Change the title
     * @param event
     */
    titleChanged(event) {
        this.editValue.emit(event.target.value);
    }

    /**
     * Searchbar
     * @param event
     */
    handleChange(event: any) {
        const searchTerm = event.target.value;
        if (searchTerm && searchTerm.trim() !== '') {
            const filteredResults = this.arrayList.filter((option) =>
                option.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            this.result.emit(filteredResults);
            // If the user write one of this words the application send the user to the hints page
            if (
                searchTerm.toLowerCase() === 'dicas' ||
                searchTerm.toLowerCase() === 'dicas de treino' ||
                searchTerm.toLowerCase() === 'dicas treino'
            ) {
                this.router.navigate(['tabs/home/hints']);
            }
        } else {
            this.result.emit(this.arrayList);
        }
    }
}
