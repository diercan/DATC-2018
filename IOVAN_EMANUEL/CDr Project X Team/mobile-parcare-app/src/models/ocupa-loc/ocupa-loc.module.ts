import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OcupaLocModal } from './ocupa-loc';

@NgModule({
  declarations: [
    OcupaLocModal,
  ],
  imports: [
    IonicPageModule.forChild(OcupaLocModal),
  ],
  entryComponents: [
    OcupaLocModal
  ],
})

export class OcupaLocModalModule {}
