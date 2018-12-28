import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NavController, ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { ConfService } from 'src/app/services/conf/conf.service';
import { HttpService } from 'src/app/services/http/http.service';

declare var cordova: any;

@Component({
  selector: 'app-contact',
  templateUrl: 'contact.page.html',
  styleUrls: ['contact.page.css']
})
export class ContactPage {
  imgPreview = 'assets/images/avatar.png';
  lastImage: string = null;
  loading: any;
  constructor(
    public auth: AuthService,
    public cfg: ConfService,
    public http: HttpService,
    public navController: NavController,
    public toastController: ToastController,
    private imagePicker: ImagePicker,
    public navCtrl: NavController,
    public camera: Camera,
    public transfer: FileTransfer,
    public file: File,
    public filePath: FilePath,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    public platform: Platform,
    public loadingCtrl: LoadingController,
    private DomSanitizer: DomSanitizer,
    private webview: WebView
  ) {
    if (this.auth.userData.Photo) {
      this.imgPreview = this.cfg.BASE_URL + "/" + this.auth.userData.Photo
    }
  }

  public logout() {

    this.auth.logout().subscribe((data) => {
      this.auth.isLogged = false;
      localStorage.removeItem("token");
      this.navController.navigateRoot("login");
      this.presentToast("Sucessfull logout !")
    }, (err) => {
      localStorage.removeItem("token");
      this.navController.navigateRoot("login");
    })
  }

  // public async presentToast(message) {
  //   const toast = await this.toastController.create({
  //     message: message,
  //     duration: 3000,
  //     position: "top"
  //   });
  //   toast.present();
  // }


  private async presentToast(text) {
    let toast = await this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  private upload(event) {
    const file = event.target.files[0];
    const formData = new FormData();
    var name = event.target.files[0].name;
    formData.append('file', event.target.files[0]);
    formData.append('type', "image_description");
    formData.append('token', localStorage.getItem("token"));
    this.http.upload(formData).subscribe((data: any) => {
      this.imgPreview = this.cfg.BASE_URL + "/" + data.FileName;
    })
  }
}
