import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HartaModal } from './harta';

@NgModule({
  declarations: [
    HartaModal,
  ],
  imports: [
    IonicPageModule.forChild(HartaModal),
  ],
  entryComponents: [
    HartaModal
  ],
})

export class HartaModalModule {}
