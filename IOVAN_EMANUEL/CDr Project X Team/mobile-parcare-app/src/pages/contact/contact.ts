import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';

@IonicPage({
  priority: 'off'
})
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController,
              private emailComposer: EmailComposer) {

  }

  trimiteMail() {
    let email = {
      to: 'emiiovan@clinicdr.com',
      subject: '[CDr X Project]'
    };
  
    this.emailComposer.open(email);
  }
}
