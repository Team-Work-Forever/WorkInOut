import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'flag-displayer',
    templateUrl: './flag-displayer.component.html',
    styleUrls: ['./flag-displayer.component.scss'],
})
export class FlagDisplayerComponent implements OnInit {
    public displayCategory: string;
    public displayQty: number = 0;
    public flagColor: string;

    constructor(private categoryService: CategoryService) {}

    @Input()
    hasAgenda: boolean = false;

    @Input()
    public categories: Category[];

    @Output()
    open: EventEmitter<any> = new EventEmitter();

    async ngOnInit() {
        console.log(this.categories.length);

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
    }

    openSchedule() {
        this.open.emit();
    }
}
