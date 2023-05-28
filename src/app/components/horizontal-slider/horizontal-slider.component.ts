import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
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

    public ngOnChanges(changes: SimpleChanges): void {
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
                this.eventChecked(true, 0);
            }
        }
    }

    public eventChecked(event: boolean, index: number) {
        if (index === 0) {
            this.arrayList.forEach((elem) => {
                elem.isChecked = event;

                if (elem.id != '') {
                    if (elem.isChecked) {
                        this.addToSelectedCategory(elem.id);
                    } else {
                        this.removeSelectedCategory(elem.id);
                    }
                }
            });
        } else {
            if (!event && this.arrayList[0].isChecked) {
                this.arrayList[0].isChecked = false;
            }
            this.arrayList[index].isChecked = event;

            if (event) {
                this.addToSelectedCategory(this.arrayList[index].id);
            } else {
                this.removeSelectedCategory(this.arrayList[index].id);
            }
        }

        if (this.selectedCategories.length === this.arrayList.length - 1) {
            this.arrayList[0].isChecked = true;
        }

        this.selectionChanged.emit(this.selectedCategories);
    }

    addToSelectedCategory(newValue) {
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
