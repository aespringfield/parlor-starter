import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Card } from './card.model';
import { CardsProvider } from '../../providers/cards/cards';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage implements OnInit{
  cards: Card[];
  selectedCard: Card;

  constructor(public navCtrl: NavController, public navParams: NavParams, private cardsProvider: CardsProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

  ngOnInit() {
    this.cards = this.cardsProvider.getCards();
    console.log(this.cards);
    this.setSelectedCard();
  }

  setSelectedCard() {
    this.selectedCard = this.cards[Math.floor(Math.random() * this.cards.length)]
  }

}
