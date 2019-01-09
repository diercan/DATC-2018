import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/services/message/message.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.css']
})
export class TabsPage {

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }

  changeTabEv(fromTab) {
    this._messageService.sendMessage("change_tab", fromTab);
  }
}
