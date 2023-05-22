import { CommonModule } from '@angular/common';
import {
    CUSTOM_ELEMENTS_SCHEMA,
    Component,
    ContentChildren,
    ElementRef,
    OnInit,
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

    @ContentChildren(SwiperPageDirective) widgets;

    @ViewChild('swiper')
    public swiperRef: ElementRef | undefined;

    constructor() {}

    ngOnInit() {
        console.log(this.widgets);
    }

    public onSlideChange() {
        this.currentIndex = this.swiperRef?.nativeElement.swiper.activeIndex;
    }
}
