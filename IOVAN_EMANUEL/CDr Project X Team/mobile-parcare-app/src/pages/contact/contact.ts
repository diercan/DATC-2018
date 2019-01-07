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
  mesaj: String = '';
  mail: String = '';
  constructor(public navCtrl: NavController,
              private emailComposer: EmailComposer) {

  }

  trimiteMail() {
    let email = {
      to: 'emiiovan@clinicdr.com',
      subject: '[CDr X Project]',
      body: this.mesaj + "<br /> <br />Trimis de: " + this.mail,
      isHtml: true
    };
  
    this.emailComposer.open(email);
  }
}
