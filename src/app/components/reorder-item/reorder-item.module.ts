import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReorderItemComponent } from './reorder-item.component';

@NgModule({
    declarations: [ReorderItemComponent],
    exports: [ReorderItemComponent],
    imports: [CommonModule, IonicModule],
})
export class ReorderItemModule {}
