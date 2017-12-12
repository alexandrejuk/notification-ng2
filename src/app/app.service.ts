import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class AppService {

  private endpointApi = 'http://localhost:3000';
  private socket;

  constructor(private http: Http) {}

  postNotification(notification): Observable<any> {
    const urlApi = `${this.endpointApi}/api/notifications`;
    return this.http
      .post(urlApi, notification)
      .map(res => res.json() as any);
  }

  sendNotification(notification) {
    this.socket.emit('new-notification', notification);
  }

  getNotifications() {
    const observable = new Observable(observer => {
      this.socket = io(this.endpointApi);
      this.socket.on('notigication', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
