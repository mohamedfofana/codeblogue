import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../services/models/user';

import { AuthService } from '../services/auth.service';
import { ValidationService } from '../services/validation.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  errorLogin: string;
  errorPassword: string;
  loginForm: FormGroup;
  user: IUser;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _location: Location) {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }

  ngOnInit() {
    if (localStorage.getItem('userLogged') == 'true') {
      this._location.back();
    }
  }
  inputChange(data, controlName:string): void {
    this.loginForm.patchValue({controlName: data.target.value});
  }

  isFieldValid(field: string) {
    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field)
    };
  }

  resetErrorMessages(): void {
    this.errorLogin = '';
    this.errorMessage = '';
    this.errorPassword = '';
  }
  onSubmit(): void {
    this.resetErrorMessages();
    if (!ValidationService.emailValidator(this.loginForm.controls.email.value)) {
      this.errorLogin = "Email invalide.";
      return
    }
    if (!ValidationService.passwordValidator(this.loginForm.controls.password.value)) {
      this.errorPassword = "Mot de passe invalide.";
      return
    }
    if (this.loginForm.valid) {
      this.user = this.loginForm.value;
      this._authService.login(this.user).subscribe(res => {
        let errorField: string = this._authService.isLogged(res, this.user);
        if (errorField == 'email')
          this.errorLogin = 'Email inexistant.'
        if (errorField == 'password')
          this.errorLogin = 'Mot de passe incorrect.'
      }, error => this.errorMessage = <any>error);
    }
  }

}
