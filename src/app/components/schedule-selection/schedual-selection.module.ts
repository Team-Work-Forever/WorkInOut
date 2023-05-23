import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedualSelectionComponent } from './schedual-selection.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [SchedualSelectionComponent],
    exports: [SchedualSelectionComponent],
    imports: [CommonModule, IonicModule],
})
export class SchedualSelectionModule {}
