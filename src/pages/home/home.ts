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
  displayName: string;

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
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    })
  }

  signInWithGoogle() {
    console.log('trying to sign in');
    if (this.platform.is('cordova')) {
      return this.googlePlus.login({})
      .then(res => {
        console.log(res);
        const googleCredential = firebase.auth.GoogleAuthProvider.credential(res.idToken);
        firebase.auth().signInWithCredential(googleCredential);
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        console.log(res.user);
      });
    }
  }

  signOut() {
    console.log('logging out');
    
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
  
  removeAnimal(animal): void {
    this.afDB.list('/Animals').remove(animal);
  }
}

function splitFirst(user): string {
  return user.displayName.split(' ')[0];
}