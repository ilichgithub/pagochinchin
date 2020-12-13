import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { LoginServiceService } from '../../../login-service.service';

@Component({
  selector: 'app-coin',
  templateUrl: './coin.component.html',
  styleUrls: ['./coin.component.css']
})
export class CoinComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 10,
    autoplayTimeout: 10000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      100: {
        items: 2
      },
      200: {
        items: 3
      },
      300: {
        items: 4
      },
      900: {
        items: 5
      },
      1000: {
        items: 6
      }
    },
    nav: false
  }

  infoResult:any = [];

  constructor( private modal: NgbModal, private http: HttpClient, 
    private loginService: LoginServiceService, ) { 

  }

  ngOnInit(): void {
    this.getInfo();

    setInterval(() => {  this.getInfo()   }, 30000);
  }

  getInfo(): void {
    let self = this;
    this.loginService.getInfo().subscribe((res) => {
      console.log('Res',res.data)
      res.data.forEach(element => {
        if(element.pm.startsWith("USD") && element.q == 'BUSD' && (element.b == 'BTC' || element.b == 'ETH' || element.b == 'DASH' || element.b == 'PTR' || element.b == 'BS' || element.b == 'EUR') ){
          self.infoResult.push(element);
        }
        
      });
    });

  }


}
