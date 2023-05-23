import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [ExerciseComponent],
    exports: [ExerciseComponent],
    imports: [CommonModule, IonicModule],
})
export class ExerciseModule {}
