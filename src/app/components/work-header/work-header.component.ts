import { CommonModule } from '@angular/common';
import {
    Component,
    ContentChildren,
    EventEmitter,
    Input,
    OnInit,
    Output,
    QueryList,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Card } from 'src/app/interfaces/card.inteface';

@Component({
    standalone: true,
    imports: [CommonModule, IonicModule, FormsModule],
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
    title: string = 'Bem Vindo';

    @ContentChildren('widget')
    widgets: QueryList<Component>;

    @Output()
    result: EventEmitter<Card[]> = new EventEmitter<Card[]>();

    constructor() {}

    ngOnInit() {}

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
