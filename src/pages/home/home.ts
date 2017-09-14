import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  items: FirebaseListObservable<any[]>;
  timbo: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, afDB: AngularFireDatabase) {
    this.items = afDB.list('/Animals');
    this.timbo = afDB.object('/Timbo');
  }

  ngOnInit(): void {
    console.log(this.items);
    console.log(this.timbo);
  }
}
