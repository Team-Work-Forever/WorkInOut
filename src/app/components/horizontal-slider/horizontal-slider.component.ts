import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';

@Component({
    selector: 'horizontal-slider',
    templateUrl: './horizontal-slider.component.html',
    styleUrls: ['./horizontal-slider.component.scss'],
})
export class HorizontalSliderComponent implements OnChanges {
    private selectedCategories: string[] = [];

    @Input()
    public arrayList: HorizontalItem[];

    @Output()
    public selectionChanged: EventEmitter<string[]> = new EventEmitter();

    ngOnChanges(changes: SimpleChanges): void {
        if ('arrayList' in changes) {
            const currentList: HorizontalItem[] =
                changes['arrayList'].currentValue;

            if (currentList && currentList.length > 0) {
                const newHorizontalItem: HorizontalItem = {
                    id: '',
                    title: 'Todos',
                    color: '#6A778A',
                };

                currentList.splice(0, 0, newHorizontalItem);
            }
        }
    }

    public eventChecked(event: boolean, index: number) {
        if (index === 0) {
            if (event) {
                this.arrayList.forEach((elem) => (elem.isChecked = true));
            } else {
                this.arrayList.forEach((elem) => (elem.isChecked = false));
            }
        } else {
            if (!event && this.arrayList[0].isChecked) {
                this.arrayList[0].isChecked = false;
            } else {
                this.arrayList[index].isChecked = event;
            }
        }

        this.arrayList.forEach((btn) => {
            if (btn.id != '') {
                if (btn.isChecked) {
                    this.addToSelectedCategory(btn.id);
                } else {
                    this.removeSelectedCategory(btn.id);
                }
            }
        });

        this.selectionChanged.emit(this.selectedCategories);
    }

    addToSelectedCategory(newValue) {
        const index = this.selectedCategories.findIndex(
            (item) => item === newValue
        );

        if (!this.selectedCategories.includes(newValue)) {
            this.selectedCategories.push(newValue);
        }
    }

    removeSelectedCategory(oldValue) {
        const index = this.selectedCategories.findIndex(
            (category) => category === oldValue
        );
        if (index !== -1) {
            this.selectedCategories.splice(index, 1);
        }
    }
}
