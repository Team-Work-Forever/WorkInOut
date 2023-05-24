import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/interfaces/card.inteface';

@Component({
    selector: 'app-card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss'],
})
export class CardComponent implements OnInit {
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
    time: string = '';

    @Input()
    icon: string;

    @Output()
    isSelected: EventEmitter<Card> = new EventEmitter();

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
            isFavorite: this.isFavorite,
            time: this.time,
            title: this.time,
            id: this.id,
        } as Card);
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
        this.option = this.isFavorite
            ? this.icon + '-sharp'
            : this.icon + '-outline';
        this.isSelected.emit({
            id: this.id,
            image: this.image,
            isFavorite: this.isFavorite,
            time: this.time,
            title: this.title,
        });
    }
}
