import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ReservePage } from '../reserve/reserve.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: HomePage }])
  ],
  providers: [Geolocation],
  declarations: [HomePage, ReservePage],
  entryComponents: [ReservePage]
})
export class HomePageModule { }
