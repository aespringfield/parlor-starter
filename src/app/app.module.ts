import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http'
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { CardPage } from '../pages/card/card';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';

import { Config } from './config'
import { CardsProvider } from '../providers/cards/cards';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    CardPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(Config.FIREBASE_CONFIG)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    CardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GooglePlus,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CardsProvider
  ]
})
export class AppModule {}
