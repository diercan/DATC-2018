import { Component, OnInit } from "@angular/core";
import { NavParams, ViewController, IonicPage } from "ionic-angular";
import { DomSanitizer } from "@angular/platform-browser";

@IonicPage({
    priority: 'off'
})
@Component({
    selector: 'page-harta',
    templateUrl: 'harta.html'
})

export class HartaModal {
    locatie: string;
    url: any;
    isLoading: boolean;
    constructor(public params: NavParams,
                private viewCtrl: ViewController,
                public domSanitizer: DomSanitizer) {       
    }

    ionViewWillEnter(){
        this.locatie = this.params.get("locatie").split(" ").join("%20").split(",").join("%2C");
        this.url = this.domSanitizer.bypassSecurityTrustResourceUrl("https://maps.google.com/maps?width=100%&height=400&hl=en&q=" + this.locatie + "+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed");
    }

    ionViewDidEnter(){
    }

    inchide() {
        this.viewCtrl.dismiss();
    }
}