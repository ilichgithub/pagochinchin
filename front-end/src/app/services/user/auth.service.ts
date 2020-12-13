import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userDummy, userDummy2Fa } from '../../data/model/login';

import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private route: Router
  ) { }

  doLogin(user: string, pass: string): any{
    let sesion = false;
    let data: object = {};
    sesion = (userDummy.userName === user) ? true : false;
    sesion = (userDummy.password === pass && sesion === true) ? true : false;
    if (sesion) {
      data = {
          name : user,
          token: 'bb5dc8842ca31d4603d6aa11448d1654'
      };
      localStorage.setItem('data', JSON.stringify(data));
    }
    return sesion;
  }
  doTwoFa(pin: string): any{
    let sesion = false;
    let data: any;
    sesion = ( userDummy2Fa.pin === pin) ? true : false;
    /* if ( localStorage.getItem('data')){
      data =   JSON.parse( localStorage.getItem('data') ) ;
      sesion = (userDummy2Fa.user === data.name && userDummy2Fa.pin === pin) ? true : false;
    } */
    console.log('session:' + sesion );
    return sesion;
  }
  searchUser(user: string): boolean{
    let valid = false;
    valid = ( userDummy.userName === user ) ? true : false;
    return valid;
  }
  logout(): void{
    if (localStorage.getItem('data')){
      localStorage.removeItem('data');
    }
    if (localStorage.getItem('register')){
      localStorage.removeItem('register');
    }
    this.route.navigate(['home/login']);
  }
  activeSesion(): void{
    if (localStorage.getItem('data')) {
      const data = localStorage.getItem('data');
      console.log(data);
    } else {
      this.route.navigate(['home/login']);
    }
  }
  /* example */
  getNewCountries(): any{
    const headers = new HttpHeaders({
      Expires: 'Jue, 21 Oct 2021 07:28:00 GMT'
    });
    return this.httpClient.get('https://restcountries.eu/rest/v2/lang/es')
                .pipe( map( data => {
                  return data['countries'].items;
                }));
  }
}
