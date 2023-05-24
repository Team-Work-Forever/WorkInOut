import { Category } from '../models/category.model';
import { ExerciseItem } from './exercise-item.interface';

export interface CreateRouteProps {
    title: string;
    exercises?: ExerciseItem[];
    categories?: Category[];
}
