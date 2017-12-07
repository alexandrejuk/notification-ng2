import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService {
  private endpointApi = 'http://localhost:3000';
  constructor(private http: Http) {}

  getAllCalls(): Observable<any[]> {
    return this.http
      .get(`${this.endpointApi}/calls`)
      .map(res => res.json() as any[]);
  }
  postCall(call): Observable<any> {
    return this.http
      .post(`${this.endpointApi}/calls`, call)
      .map(res => res.json() as any);
  }

  getAllNotification(): Observable<any[]> {
    return this.http
      .get(`${this.endpointApi}/notification`)
      .map(res => res.json() as any[]);
  }
  postNotification(notification): Observable<any> {
    return this.http
      .post(`${this.endpointApi}/notification`, notification)
      .map(res => res.json() as any);
  }
}
