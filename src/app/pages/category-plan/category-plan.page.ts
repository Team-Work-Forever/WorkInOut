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
export class CategoryPlanPage implements ViewWillEnter {
    public isLoading: boolean = false;
    cards: Card[];

    constructor(private categoryService: CategoryService) {}

    handleClick(card: Card) {
        // this.nav.navigateForward('/detalhe', { state: card });
    }

    async ionViewWillEnter() {
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        this.isLoading = true;

        const categories = await this.categoryService.getAllCategories();

        this.cards = categories.map((cat) => {
            return {
                id: cat.id,
                title: cat.title,
                image: cat.badge,
                isFavorite: cat.isFavourite,
            } as Card;
        });

        this.isLoading = false;
    }
}
