import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  private date = '2017-12-07T12:06:07.257Z';
  private groups = ['5a2fab1905ec6e12748e461a', '5a2fab2b05ec6e12748e461d'];
  private connection;
  public notifications;

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.createForm();
    this.appService.sendUser({ id: '2', name: 'alexandre'});
    this.connection = this.appService.getNotifications().subscribe(res => {
    this.notifications.push(res);
    });
    this.appService.getAllNotifications().subscribe(res => this.notifications = res);
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  newNotification(data) {
   if (data.title) {
    data.groups = this.groups;
    data.date = this.date;
    this.appService.postNotification(data)
    .subscribe(res => res);
   }
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
