import {
    AfterContentInit,
    AfterViewInit,
    Component,
    Input,
    OnInit,
} from '@angular/core';
import { HorizontalItem } from 'src/app/interfaces/horizontal-item.interface';

@Component({
    selector: 'horizontal-slider',
    templateUrl: './horizontal-slider.component.html',
    styleUrls: ['./horizontal-slider.component.scss'],
})
export class HorizontalSliderComponent {
    constructor() {}

    @Input()
    arrayList: HorizontalItem[];
}
