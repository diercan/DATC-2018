import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FrontPage } from './front-page';

@NgModule({
  declarations: [
    FrontPage,
  ],
  imports: [
    IonicPageModule.forChild(FrontPage),
  ],
  entryComponents: [
    FrontPage,
  ],
})

export class FrontPageModule {}