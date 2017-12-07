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
      .map(res => {
        console.log(res);
        return res.json() as any[];
      });
  }
}
