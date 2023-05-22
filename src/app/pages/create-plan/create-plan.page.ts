import { Component, OnInit } from '@angular/core';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
    selector: 'app-create-plan',
    templateUrl: './create-plan.page.html',
    styleUrls: ['./create-plan.page.scss'],
})
export class CreatePlanPage implements OnInit {
    constructor() {}

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
}
