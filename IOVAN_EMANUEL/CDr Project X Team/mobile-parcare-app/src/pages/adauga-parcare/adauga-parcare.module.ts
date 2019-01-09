import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdaugaParcarePage } from './adauga-parcare';

@NgModule({
  declarations: [
    AdaugaParcarePage,
  ],
  imports: [
    IonicPageModule.forChild(AdaugaParcarePage),
  ],
  entryComponents: [
    AdaugaParcarePage,
  ],
})

export class AdaugaParcarePageModule {}