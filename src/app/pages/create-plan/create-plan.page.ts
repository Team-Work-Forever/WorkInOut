import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ItemReorderEventDetail } from '@ionic/angular';
import { Plan } from 'src/app/models/plan.model';
import { User } from 'src/app/models/user.model';
import { PlanService } from 'src/app/services/plan-service.service';

@Component({
    selector: 'app-create-plan',
    templateUrl: './create-plan.page.html',
    styleUrls: ['./create-plan.page.scss'],
})
export class CreatePlanPage implements OnInit {
    private planTitle: string = '';

    constructor(private planService: PlanService) {}

    ngOnInit() {}

    handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
        // The `from` and `to` properties contain the index of the item
        // when the drag started and ended, respectively
        console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

        // Finish the reorder and position the item in the DOM based on
        // where the gesture ended. This method can also be called directly
        // by the reorder group
        ev.detail.complete();
    }

    planTitleChanged(event: string) {
        this.planTitle = event;
    }

    async createPlan() {
        await this.planService.createPlan(
            {
                badge: 'xdasdas',
                color: '#000',
                duration: 2,
                is_favourite: false,
                title: this.planTitle,
            } as Plan,
            {
                userId: '4a0ae186-7dee-41ba-9f0e-a26d4ecaff7f',
            } as User
        );
    }
}
