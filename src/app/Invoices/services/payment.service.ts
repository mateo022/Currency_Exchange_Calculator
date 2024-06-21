import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = env.url_api;
  private denominationsUrl = env.denominationsUrl

  constructor(private http: HttpClient) { }

  getDenominations(): Observable<{ [key: string]: number[] }> {
    return this.http.get<{ [key: string]: number[] }>(this.denominationsUrl);
  }

  getExchangeRate(currency: string): Observable<any> {
    return this.http.get(`${this.apiUrl}${currency}`);
  }
}