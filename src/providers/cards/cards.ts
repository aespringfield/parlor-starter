import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the CardsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CardsProvider {

  constructor(public http: Http) {
    console.log('Hello CardsProvider Provider');
  }

  playsJSON = `{
    "plays": {
        "one": {
            "timestamp": 12345,
            "game": "saladBowl",
            "parlor": "one",
            "timeLeftOver": 0,
            "teams": {
                "one": {
                    "name": "Romper Stompers",
                    "points": 0,
                    "members": {
                        "1": "aespringfield",
                        "2": "jbragland"
                    }
                },
                "two": {
                    "name": "Punkin Chunkers",
                    "points": 0,
                    "members": {
                        "1": "stephsky", 
                        "2": "fcpickles"
                    }
                }
            },
            "cards": {
                "one": "cupcake",
                "two": "piano"
            },
            "round_1": {
                "one": {
                    "lastPassed": 1249875195
                }
            }
        }
    }
  }`;

  getCards() {
    const cardsObject = JSON.parse(this.playsJSON).plays.one.cards;
    return Object.keys(cardsObject).map(key => {
      return {id: key, word: cardsObject[key]};
    })
  }

}
