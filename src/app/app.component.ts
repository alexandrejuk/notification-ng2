import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  form: FormGroup;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {  
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      message: ['', [Validators.required]]
    })
  }

  onSubmit(values) {
    console.log(values)
  }
}
