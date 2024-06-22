import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';
import { Denomination } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = env.url_api;
  private denominationsUrl = env.denominationsUrl

  constructor(private http: HttpClient) { }


  getDenominations(): Observable<{ [key: string]: Denomination[] }> {
    return this.http.get<{ [key: string]: Denomination[] }>(this.denominationsUrl);
  }

  getExchangeRate(currency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${currency}`);
  }
}