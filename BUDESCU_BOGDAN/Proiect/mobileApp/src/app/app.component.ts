import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _auth: AuthService,
    private _router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this._auth.checkToken().subscribe((data: any) => {
        console.log(data)
        this._auth.isLogged = true;
        this._router.navigateByUrl('tabs')
        this._auth.userData = data.userData;
      }, (err) => {
        this._auth.isLogged = false;
        this._router.navigateByUrl('login')
        localStorage.removeItem("token")

      })
    });
  }

}
