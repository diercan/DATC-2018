import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParcariPage } from './parcari';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  declarations: [
    ParcariPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(ParcariPage),
  ],
  entryComponents: [
    ParcariPage,
  ],
})

export class ParcariPageModule {}