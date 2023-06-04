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
    results: Card[];

    constructor(private categoryService: CategoryService) {}

    async ionViewWillEnter() {
        // This lock the device on the portrait orientation
        const options: OrientationLockOptions = { orientation: 'portrait' };
        ScreenOrientation.lock(options);

        // Present the symbol of loading
        this.isLoading = true;

        // Get all Categories
        const categories = await this.categoryService.getAllCategories();

        // Define all Categories
        this.cards = categories.map((cat) => {
            return {
                id: cat.id,
                title: cat.title,
                image: cat.badge,
                isFavorite: cat.isFavourite,
            } as Card;
        });

        this.results = this.cards;

        // End the loading
        this.isLoading = false;
    }

    /**
     * Show the categories by filter
     * @param filteredResults
     */
    handleResult(filteredResults: Card[]) {
        // Make the results be the filteredResults
        this.results = filteredResults;
    }
}
