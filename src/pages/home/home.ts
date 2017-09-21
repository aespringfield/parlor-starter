import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { GooglePlus } from '@ionic-native/google-plus';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  items: FirebaseListObservable<any[]>;
  animal: string;
  user: object;
  // displayName: string;

  constructor(
    public navCtrl: NavController, 
    public afDB: AngularFireDatabase, 
    private afAuth: AngularFireAuth,
    private googlePlus: GooglePlus,
    private platform: Platform
  ) {
    this.items = afDB.list('/Animals');
    afAuth.authState.subscribe((user: firebase.User) => {
      if (!user) {
        // this.displayName = null;
        return;
      }
      // this.displayName = user.displayName;
      this.user = user;
    })
  }

  signInWithGoogle() {
    console.log('trying to sign in');
    if (this.platform.is('cordova')) {
      return this.googlePlus.login({})
      .then(res => {
        console.log(res);
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.id_token);
        firebase.auth().signInWithCredential(googleCredential);
        this.user = res.user;
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.user = res.user;
        console.log(this.user);;
      });
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

  ngOnInit(): void {
  }

  addPanda(): void {
    this.afDB.list('/Animals').push('panda');
    console.log(this.animal);
  }

  addAnimal(animal): void {
    this.afDB.list('/Animals').push(animal);
  }
  
}

function splitFirst(user): string {
  return user.displayName.split(' ')[0];
}