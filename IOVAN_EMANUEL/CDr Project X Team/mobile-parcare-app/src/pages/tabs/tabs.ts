import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage({
  priority: 'off'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'ParcariPage';
  tab2Root = 'AdaugaParcarePage';
  tab3Root = 'ContactPage';

  constructor() {

  }
}
