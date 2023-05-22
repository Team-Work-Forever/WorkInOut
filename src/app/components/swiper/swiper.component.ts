import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular';

@Component({
    standalone: true,
    selector: 'swiper',
    templateUrl: './swiper.component.html',
    styleUrls: ['./swiper.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperComponent implements OnInit {
    public swiperModules = [IonicSlides];

    constructor() {}

    ngOnInit() {}
}
