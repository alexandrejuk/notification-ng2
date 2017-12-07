import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public form: FormGroup;
  public calls = [];
  public notifications;
  private userName = 'Alan';
  private date = '2017-12-07T12:06:07.257Z';
  private message = { post: 'Atendimento Criado por ', put: 'Atendimento Alterado por ' };

  constructor(private fb: FormBuilder, private appService: AppService) {}

  ngOnInit() {
    this.createForm();
    this.getCalls();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]]
    });
  }

  getCalls() {
    this.appService.getAllCalls().subscribe(res => this.calls = res);
    this.appService.getAllNotification().subscribe(res => {
      this.notifications = res
    });
  }

  onSubmit(values) {
    const userLog = {
      createdAt: this.date,
      createdBy: this.userName,
      updatedAt: this.date,
      updatedBy: this.userName
    };
    this.appService.postCall(Object.assign({}, values, userLog)).subscribe(res => {
      this.calls.push(res);
      this.pushNotification(res);
    });
  }

  pushNotification(value) {
    const modifyNotification = {
      message: this.message.post,
      id_atendimento: value.id,
      userCreate: value.createdBy,
      date: value.createdAt
    };
    this.appService.postNotification(modifyNotification).subscribe(res => console.log(res));
  }
}
