import { Component, OnInit } from '@angular/core';
import { HttpService, ParkStatus } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dataReceived: any[] = [];
  public datas: ParkStatus[] = [];
  public count: number = 0;
  constructor(private httpService: HttpService) { }

  public getRandomStatus() {
    let rand = Boolean(Math.round(Math.random()));
    if (rand) {
      return 1;
    }
    else {
      return 0;
    }
  }

  public getWrongRandomStatus() {
    let arr = [0, 1, 2];
    return arr[Math.floor(Math.random() * arr.length)];
  }

  ngOnInit() {
    setInterval(() => {
      this.datas =[];
      this.count++;
      console.log(this.count);
      for (let index = 1; index <= 17; index++) {
        let rndStatus = this.getRandomStatus();
        if (this.count % 3 == 0) {
          rndStatus = this.getWrongRandomStatus();
        }
        let data: ParkStatus = { ParkId: index, Status: rndStatus };
        this.datas.push(data)
      }
      this.httpService.addData(this.datas).subscribe((data1) => { console.log(data1) })
    }, 5000)
  }
}
