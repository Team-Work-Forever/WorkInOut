import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModelItemComponent } from './model-item.component';

@NgModule({
    declarations: [ModelItemComponent],
    exports: [ModelItemComponent],
    imports: [CommonModule, IonicModule],
})
export class ModelItemModule {}
