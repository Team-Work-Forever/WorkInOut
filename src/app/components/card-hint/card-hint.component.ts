import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hint } from 'src/app/interfaces/hint.interface';

@Component({
    selector: 'app-card-hint',
    templateUrl: 'card-hint.component.html',
    styleUrls: ['card-hint.component.scss'],
})
export class CardHintComponent implements OnInit {
    @Input()
    id: string;

    @Input()
    hasFavorite: boolean = true;

    @Input()
    isFavorite?: boolean;

    @Input()
    image?: string = '';

    @Input()
    title: string = 'Dica';

    @Input()
    description?: string;

    @Input()
    color?: string;

    @Input()
    icon: string;

    @Output()
    isSelected: EventEmitter<Hint> = new EventEmitter();

    @Output()
    eventClick: EventEmitter<any> = new EventEmitter();

    option: string;

    ngOnInit(): void {
        this.option = this.isFavorite
            ? this.icon + '-sharp'
            : this.icon + '-outline';
    }

    handleClick() {
        this.eventClick.emit({
            image: this.image,
            description: this.description,
            title: this.title,
            id: this.id,
            color: this.color,
        } as Hint);
    }

    /**
     * Button to became a plan favorite (is it is already favorite then the flag is unselected)
     * @param event
     */
    toggleFavorite(event) {
        event.stopPropagation();
        this.isFavorite = !this.isFavorite;
        this.option = this.isFavorite
            ? this.icon + '-sharp'
            : this.icon + '-outline';
        this.isSelected.emit({
            image: this.image,
            description: this.description,
            title: this.title,
            id: this.id,
            color: this.color,
            isFavorite: this.isFavorite,
        });
    }
}
