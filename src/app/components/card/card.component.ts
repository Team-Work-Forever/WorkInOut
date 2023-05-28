import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/interfaces/card.inteface';
import { convertToMinutesSeconds } from 'src/utils/time-date.utils';

@Component({
    selector: 'app-card',
    templateUrl: 'card.component.html',
    styleUrls: ['card.component.scss'],
})
export class CardComponent implements OnInit {
    public displayDuration: string;

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
    time: number;

    @Input()
    icon: string;

    @Output()
    isSelected: EventEmitter<Card> = new EventEmitter();

    @Output()
    eventClick: EventEmitter<any> = new EventEmitter();

    option: string;

    ngOnInit(): void {
        this.displayDuration = convertToMinutesSeconds(this.time);
        this.option = this.isFavorite
            ? this.icon + '-sharp'
            : this.icon + '-outline';
    }

    handleClick() {
        this.eventClick.emit({
            image: this.image,
            isFavorite: this.isFavorite,
            time: this.time,
            title: this.title,
            id: this.id,
        } as Card);
    }

    toggleFavorite(event) {
        event.stopPropagation();
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
