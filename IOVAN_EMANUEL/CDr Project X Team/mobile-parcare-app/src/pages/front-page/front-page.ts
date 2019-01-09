import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { GlobalsService } from '../../providers/globals.service';

@IonicPage({
  priority: 'off'
})
@Component({
  selector: 'page-front-page',
  templateUrl: 'front-page.html'
})
export class FrontPage {
  nume: string = "";
  constructor(public navCtrl: NavController,
              public globals: GlobalsService) {

  }

  start() {
    this.globals.userName = this.nume;
    this.navCtrl.setRoot("TabsPage");
  }
}
