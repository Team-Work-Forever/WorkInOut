import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemVisualizerComponent } from './item-visualizer.component';
import { IonicModule } from '@ionic/angular';
import { SwiperModule } from '../swiper/swiper.module';

@NgModule({
    declarations: [ItemVisualizerComponent],
    exports: [ItemVisualizerComponent],
    imports: [CommonModule, IonicModule, SwiperModule],
})
export class ItemVisualizerModule {}
