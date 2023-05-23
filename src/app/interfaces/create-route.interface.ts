import { ExerciseItem } from './exercise-item.interface';

export interface CreateRouteProps {
    title: string;
    exercises?: ExerciseItem[];
}
