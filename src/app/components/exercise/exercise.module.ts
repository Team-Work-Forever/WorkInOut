import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExerciseComponent } from './exercise.component';

@NgModule({
    declarations: [ExerciseComponent],
    exports: [ExerciseComponent],
    imports: [CommonModule],
})
export class ExerciseModule {}
