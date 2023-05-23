import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HorizontalSliderComponent } from './horizontal-slider.component';
import { CheckButtonModule } from '../check-button/components.module';

@NgModule({
    declarations: [HorizontalSliderComponent],
    exports: [HorizontalSliderComponent],
    imports: [CommonModule, CheckButtonModule],
})
export class HorizontalSliderModule {}
