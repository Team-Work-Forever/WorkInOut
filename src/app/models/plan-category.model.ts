import { Category } from './category.model';
import { Plan } from './plan.model';

export interface PlanCategory {
    plan: Plan;
    category: Category;
    is_favourite: boolean;
}
