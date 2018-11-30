import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastController, NavController, Nav } from '@ionic/angular';

import { Register } from 'src/app/models/Register';
import { CryptoService } from 'src/app/services/crypto/crypto.service';
import { HttpService } from 'src/app/services/http/http.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public registerUserModel: Register = new Register("", "", "", "", "");
  public messageSuccess: string = "";
  public messageError: string = "";
  @ViewChild("registerForm") registerForm: NgForm;
  constructor(
    private _router: Router,
    public cryptoService: CryptoService,
    public httpService: HttpService,
    public toastController: ToastController,
    public navController: NavController
  ) {
  }

  ngOnInit() { }

  public goToLogin() {

    this.navController.navigateBack("login")
  }

  public register() {

    console.log(this.registerUserModel);
    if (!this.registerForm.form.valid) {
      console.log("form is not valid");
      return;
    }

    let registerData = new Register(
      this.registerUserModel.FirstName,
      this.registerUserModel.LastName,
      this.registerUserModel.Email,
      this.registerUserModel.Password,
      this.registerUserModel.ConfirmPassword
    );

    let encryptedPassword = this.cryptoService.encrypt(registerData.Password);
    registerData.Password = encryptedPassword;
    registerData.ConfirmPassword = encryptedPassword;

    this.httpService.register(registerData).subscribe(
      (data: any) => {
        this.messageSuccess = data.message;
        this.presentToast(this.messageSuccess);
        setTimeout(() => { this.messageSuccess = "" }, 3000);
        this.navController.navigateForward("login");
      },
      (err: HttpErrorResponse) => {
        this.messageError = err.error.message
        this.presentToast(this.messageError)
        setTimeout(() => { this.messageError = "" }, 3000);
      });
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
