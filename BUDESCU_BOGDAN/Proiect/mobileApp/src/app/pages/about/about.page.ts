import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { MessageService } from 'src/app/services/message/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.css']
})
export class AboutPage {
  private _msgSubscription: Subscription;

  constructor(
    private _messageService: MessageService,
    private _httpService: HttpService
  ) {

    this.getReservationsById();
    this._messageService.getMessage().subscribe((message) => {
      if (message.action == "change_tab") {
        if (message.content == "about") {
          this.getReservationsById();
        }
      }
    });
  }

  ngOnDestroy() {
    this._msgSubscription ? this._msgSubscription.unsubscribe() : null;
  }

  getReservationsById() {
    this._httpService.getReservationsById().subscribe((data) => {
      console.log(data)
    })
  }
}
