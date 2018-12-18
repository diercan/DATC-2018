import { Component, OnInit } from "@angular/core";
import { NavParams, ViewController, IonicPage, AlertController } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";

@IonicPage({
    priority: 'off'
})
@Component({
    selector: 'page-ocupa-loc',
    templateUrl: 'ocupa-loc.html'
})

export class OcupaLocModal {
    parcare: any = this.params.get('parcare');
    constructor(public params: NavParams,
        private viewCtrl: ViewController,
        private alertCtrl: AlertController) {
        this.parcare.StareLocuriArray = this.parcare.StareLocuri.split(",");
    }

    updateParcare(id, poz, loc) {
        var data = { id: id, pozitie: poz, valoare: loc == 1 ? 0 : 1 };

        let alert = this.alertCtrl.create({
            title: 'Confirmare',
            message: 'Doriti sa ' + (loc == 1 ? 'dezocupati' : "ocupati") + ' acest loc?',
            buttons: [
                {
                    text: 'Nu',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Da',
                    handler: () => {
                        this.viewCtrl.dismiss(data);
                    }
                }
            ]
        });
        alert.present();
    }

    inchide() {
        this.viewCtrl.dismiss();
    }
}