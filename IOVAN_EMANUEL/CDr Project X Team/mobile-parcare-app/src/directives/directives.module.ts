import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LetterAvatarDirective } from './letter-avatar/letter-avatar.directive';
@NgModule({
	declarations: [
		LetterAvatarDirective,
	],
	imports: [
		IonicModule
	],
	exports: [
		LetterAvatarDirective,
	]
})
export class DirectivesModule {}
