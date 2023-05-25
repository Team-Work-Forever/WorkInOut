import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { convertToMinutesSeconds } from 'src/utils/time-date.utils';

@Component({
    selector: 'flag-displayer',
    templateUrl: './flag-displayer.component.html',
    styleUrls: ['./flag-displayer.component.scss'],
})
export class FlagDisplayerComponent implements OnInit {
    public displayCategory: string;
    public displayQty: number = 0;
    public flagColor: string;
    public displayDuration: string;

    public categories: Category[];
    private _items = new BehaviorSubject<Category[]>([]);

    constructor(private categoryService: CategoryService) {}

    @Input()
    hasAgenda: boolean = false;

    @Input()
    duration: number;

    @Input() set items(value: Category[]) {
        this._items.next(value);
    }

    get items() {
        return this._items.getValue();
    }

    @Output()
    open: EventEmitter<any> = new EventEmitter();

    async ngOnInit() {
        this._items.subscribe(async (x) => {
            this.categories = x;
            this.displayDuration = convertToMinutesSeconds(this.duration);

            console.log(x);

            if (this.categories.length === 0) return;

            let category: Category = null;

            this.categories.forEach((cat) => {
                if (!category || cat.qty > category.qty) {
                    category = cat;
                }
            });

            category = await this.categoryService.getCategoryById(category.id);
            this.flagColor = category.color;

            this.displayCategory = category ? category.title : 'Category';
            this.displayQty = this.categories.length - 1;
        });
    }

    openSchedule() {
        this.open.emit();
    }
}
