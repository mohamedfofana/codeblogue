import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../services/models/user';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service'
import { SessionService } from '../services/session.service'
import { ValidationService } from '../services/validation.service'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  errorLogin: string;
  loginForm: FormGroup;
  user: IUser;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _sessionService: SessionService, private _router: Router) { 
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }

  ngOnInit() {
        
  }

  onSubmit(): void {
    if (!ValidationService.emailValidator(this.loginForm.controls.email.value)){
      this.errorLogin = "Email invalide.";
      return
    }
    if (!ValidationService.passwordValidator(this.loginForm.controls.password.value)){
      this.errorLogin = "Mot de passe invalide.";
      return
    }
    if (this.loginForm.valid){
      this.user = this.loginForm.value;
      this._authService.login(this.user).subscribe(res => this.errorLogin = this._authService.isLogged(res, this.user), error => this.errorMessage = <any>error);    
    }
  }

}
