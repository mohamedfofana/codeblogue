import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  errorMessage: string;

  constructor(private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
  }

  onSubmit(): void {
    
  }

   getErrorMessage(): void {
  }

}
