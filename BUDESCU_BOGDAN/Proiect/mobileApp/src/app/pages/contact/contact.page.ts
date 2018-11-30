import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.scss']
})
export class ContactPage {
  constructor(
    public auth: AuthService,
    public navController: NavController,
    public toastController: ToastController,
  ) { }

  public logout() {

    this.auth.logout().subscribe((data) => {
      localStorage.removeItem("token");
      this.navController.navigateRoot("login");
      this.presentToast("Sucessfull logout !")
    }, (err) => {
      localStorage.removeItem("token");
      this.navController.navigateRoot("login");
    })
  }

  public async presentToast(message) {

    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }
}
