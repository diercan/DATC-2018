import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { Login } from 'src/app/models/Login';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.css'],
})
export class LoginPage implements OnInit {

  public loginModel: Login = {
    Email: "test@test.com",
    Password: "test"
  }
  constructor(
    private _router: Router,
    public cryptoService: CryptoService,
    public authService: AuthService,
    public navController: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController
  ) { }

  ngOnInit() {
  }

  public goToRegister() {

    this.navController.navigateForward("register");
  }

  public async submitLoginForm() {

    const loading = await this.loadingController.create({
      message: 'Please wait'
    });
    await loading.present();

    let signInData = new Login(
      this.loginModel.Email,
      this.loginModel.Password
    );

    let encryptedPassword = this.cryptoService.encrypt(signInData.Password);
    signInData.Password = encryptedPassword;

    this.authService.login(signInData).subscribe((data: any) => {
      localStorage.setItem("token", data.token);
      this.authService.userData = data.userData;
      this.authService.isLogged = true;
      setTimeout(() => {
        loading.dismiss();
        this.presentToast(data.message);
        this.navController.navigateForward("tabs")
      }, 100)
    }, (err: HttpErrorResponse) => {
      loading.dismiss()
      this.presentToast(err.error.message);
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
