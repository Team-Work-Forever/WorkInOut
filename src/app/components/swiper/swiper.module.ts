import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { SwiperPageDirective } from './swiper-page.directive';
import { SwiperComponent } from './swiper.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule],
    declarations: [SwiperPageDirective, SwiperComponent],
    exports: [SwiperPageDirective, SwiperComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SwiperModule {}
