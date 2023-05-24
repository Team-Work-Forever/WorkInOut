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
    title: string = 'Treino';

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

    pressEvent(event) {
        console.log(event);
    }

    toggleFavorite() {
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
        });
    }
}
