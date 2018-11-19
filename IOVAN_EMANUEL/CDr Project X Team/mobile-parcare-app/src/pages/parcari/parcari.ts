import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController, ModalController } from 'ionic-angular';
import { RequestsService } from '../../providers/requests.service';
import { GlobalsService } from '../../providers/globals.service';

@IonicPage({
  priority: 'off'
})
@Component({
  selector: 'page-parcari',
  templateUrl: 'parcari.html'
})
export class ParcariPage {
  isLoading: boolean;
  parcari: any;

  constructor(public navCtrl: NavController,
              private requests: RequestsService,
              private alertCtrl: AlertController,
              private globals: GlobalsService,
              private modalCtrl: ModalController) {
    this.presentAlert();
    this.getParcari();
  }

  getParcari() {
    this.isLoading = true;
    var route = "api/get/parcari";
    this.requests.get(route).subscribe(data => {
      this.parcari = data;
    }, error => {
      if (error.status = "404") {}
      console.log('Eroare! S-a intamplat ceva la request-ul pentru luarea parcarilor!');
    }, () => {
      this.isLoading = false;
    })
  }

  getInitials(name: string) {
    let arr = name.split(' ');
    let firstInitial = arr[0].substring(0, 1);
    if(arr.length >= 2) {
        let lastInitial = arr[1].substring(0, 1);
        return firstInitial.toUpperCase() + lastInitial.toUpperCase();
    }
    return firstInitial.toUpperCase();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Welcome',
      subTitle: 'Bine ai venit, ' + this.globals.userName + '!',
      buttons: ['Multumesc']
    });
    alert.present();
  }

  harta(loc) {
    const modal = this.modalCtrl.create('HartaModal', { locatie: loc });
    modal.present();
  }
}
