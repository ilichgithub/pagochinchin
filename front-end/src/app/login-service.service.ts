import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  apiUrl: string = 'http://localhost:3000/api';
  headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Headers', 'Content-Type')
      .set('Access-Control-Allow-Methods', 'GET')
      .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) { }

  // Read
  showExample(): Observable<any> {
    return this.http.get<any>(`/api/test`);
  }

  loginUser(data): Observable<any> {
    return this.http.post<any>(`/api/login`,data);
  }

  getInfo(): Observable<any> {
    return this.http.get<any>(`https://www.binance.com/exchange-api/v1/public/asset-service/product/get-products`);
  }

}
