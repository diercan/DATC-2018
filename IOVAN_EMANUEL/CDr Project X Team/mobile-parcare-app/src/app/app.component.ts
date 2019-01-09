import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GlobalsService } from '../providers/globals.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any = 'FrontPage';
  tabPages = [
    { title: 'Parcari', component: 'ParcariPage'},
    { title: 'Adauga Parcare', component: 'AdaugaParcarePage'},
    { title: 'Contacteaza-ne', component: 'ContactPage'}
  ];

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public globals: GlobalsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page);
  }
}
