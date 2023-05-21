import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { Data, loadTourismPoints } from '../services/api';

export interface Card {
  title: string;
  image: string;
  description: string;
  list: Data[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage {
  results: any[];
  cards: Card[];

  constructor(private nav: NavController) {
    this.cards = [
      {
        title: 'Pontos de interesse turísticos',
        image: '/assets/pontosTuristicos.png',
        description:
          'Póvoa de Varzim é uma cidade costeira situada no norte de Portugal, que apresenta uma variedade de pontos turísticos.',
        list: loadTourismPoints(),
      },
    ];

    this.results = this.cards;
  }

  handleChange(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm && searchTerm.trim() !== '') {
      this.results = this.cards.filter((card) => {
        return (
          card.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        );
      });
    } else {
      this.results = this.cards;
    }
  }

  handleClick(card: Card) {
    // this.nav.navigateForward('/detalhe', { state: card });
  }
}
