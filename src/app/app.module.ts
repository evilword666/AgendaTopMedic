import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Toast } from '@ionic-native/toast';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login'

import { NgCalendarModule } from 'ionic2-calendar';  //Esta libreria es necesaria para que funcione el calendario

import { HttpModule} from '@angular/http';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { BackgroundMode } from '@ionic-native/background-mode';

import { NativeAudio } from '@ionic-native/native-audio';
import { LocalNotifications } from '@ionic-native/local-notifications';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase/ngx';
import { Push } from '@ionic-native/push';

import { UniqueDeviceID } from '@ionic-native/unique-device-id';
/*
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCaFaLbM62wbOPodcMtZGIpEg8XZBSakQ8",
    authDomain: "agendabm001.firebaseapp.com",
    databaseURL: "https://agendabm001.firebaseio.com",
    projectId: "agendabm001",
    storageBucket: "agendabm001.appspot.com",
    messagingSenderId: "97593199603"
  };
  */


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    NgCalendarModule,    
    BrowserModule,
    HttpModule,    
    
    IonicModule.forRoot(MyApp, { 
      scrollPadding: false, 
      scrollAssist: true, 
      autoFocusAssist: false 
     }) 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    //HTTP,
    StatusBar,
    SplashScreen,
    BackgroundMode,
    SQLite,      
    NativeAudio, 
    LocalNotifications,
    Push, 
    Toast,
    UniqueDeviceID, 
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider
  ]
})
export class AppModule {}
