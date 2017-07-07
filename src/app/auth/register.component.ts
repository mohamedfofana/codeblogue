import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../services/models/user';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service'
import { SessionService } from '../services/session.service'

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  errorMessage: string;
  errorLogin: string;
  registerForm: FormGroup;
  user: IUser;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _sessionService: SessionService, private _router: Router) { 
    this.registerForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid){
      this.user = this.registerForm.value;
      this._authService.register(this.user).subscribe(res => this._authService.isLogged(res, this.user), error => this.errorMessage = <any>error);    
    }

  }
}
