import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalSliderComponent } from './horizontal-slider.component';

@NgModule({
    declarations: [HorizontalSliderComponent],
    exports: [HorizontalSliderComponent],
    imports: [CommonModule],
})
export class HorizontalSliderModule {}
