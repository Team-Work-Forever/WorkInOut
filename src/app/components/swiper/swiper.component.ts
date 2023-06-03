import {
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { SwiperPageDirective } from './swiper-page.directive';

@Component({
    selector: 'swiper',
    templateUrl: './swiper.component.html',
    styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent implements OnInit {
    public swiperModules = [IonicSlides];

    public currentIndex: number = 0;

    @Input() public isTopDown: boolean = false;

    @Output()
    realIndex: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(SwiperPageDirective) widgets;

    @ViewChild('swiper') public swiperRef: ElementRef | undefined;

    constructor() {}

    ngOnInit() {}

    /**
     * Change on slide
     */
    public onSlideChange() {
        this.currentIndex = this.swiperRef?.nativeElement.swiper.activeIndex;
        this.realIndex.emit(this.currentIndex);
    }
}
