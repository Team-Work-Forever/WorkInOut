import { Component, OnInit } from '@angular/core';
import {
    OrientationLockOptions,
    ScreenOrientation,
} from '@capacitor/screen-orientation';
import { ViewWillEnter } from '@ionic/angular';
import { Card } from 'src/app/interfaces/card.inteface';
import { CategoryService } from 'src/app/services/category.service';

@Component({
    selector: 'app-category-plan',
    templateUrl: './category-plan.page.html',
    styleUrls: ['./category-plan.page.scss'],
})
export class CategoryPlanPage implements OnInit, ViewWillEnter {
    cards: Card[];

    constructor(private categoryService: CategoryService) {}

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }

    ionViewWillEnter(): void {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);
    }

    async ngOnInit() {
        const categories = await this.categoryService.getAllCategories();

        this.cards = categories.map((cat) => {
            return {
                id: cat.id,
                title: cat.title,
                image: cat.badge,
                isFavorite: cat.isFavourite,
            } as Card;
        });
    }
}
