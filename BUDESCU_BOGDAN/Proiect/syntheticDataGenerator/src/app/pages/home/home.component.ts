import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public dataReceived: any[] = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    setInterval(() => {
      this.httpService.getData().subscribe((data) => {
        this.dataReceived.push(data)
      })
    }, 2000)
  }

}
