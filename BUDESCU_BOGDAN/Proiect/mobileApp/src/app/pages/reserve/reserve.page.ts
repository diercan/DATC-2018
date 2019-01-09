import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as momentz from 'moment-timezone';
import * as moment from 'moment';
import { MessageService } from 'src/app/services/message/message.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-reserve',
  templateUrl: './reserve.page.html',
  styleUrls: ['./reserve.page.css'],
})
export class ReservePage implements OnInit {

  @Input() Id: any;
  public startDate = momentz(new Date()).tz("Europe/Bucharest").format();
  public endDate = momentz(new Date()).tz("Europe/Bucharest").format();
  public initDate = momentz(new Date()).tz("Europe/Bucharest").format();
  constructor(
    private _messageService: MessageService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    console.log(this.Id)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  public async reserve() {
    const loading = await this.loadingController.create({
      message: 'Please wait'
    });
    await loading.present();

    // this._messageService.modal.dismiss({ data: true });
    if (moment(this.endDate) > moment(this.startDate)
      && moment(this.endDate) >= moment(this.initDate)
      && moment(this.startDate) >= moment(this.initDate)
    ) {
      this._httpService.createReservation({
        ParkId: this.Id,
        StartDate: momentz(this.startDate).format(),
        EndDate: momentz(this.endDate).format()
      }).subscribe((data) => {
        console.log(data)
        this._messageService.modal.dismiss();
        loading.dismiss();
      })
    } else {

      loading.dismiss();
      this.presentAlert();
    }
  }

  async presentAlert() {

    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Error trying to reserve this parking space. Please choose another dates.',
      buttons: ['OK']
    });
    return await alert.present();
  }
}
