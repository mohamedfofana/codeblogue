import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../services/models/user';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service'
import { SessionService } from '../services/session.service'
import { ValidationService } from '../services/validation.service'

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit{

  errorMessage: string;
  errorLogin: string;
  registerForm: FormGroup;
  user: IUser;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, 
              private _router: Router, private _location: Location) { 
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }
  
  ngOnInit() {
    if (localStorage.getItem('userLogged') == 'true') {
        this._location.back();
    }
  }

  onSubmit(): void {
    if (!ValidationService.emailValidator(this.registerForm.controls.email.value)){
      this.errorLogin = "Email invalide. Exemple : pseudo@exmaple.com";
      return
    }
    if (!ValidationService.passwordValidator(this.registerForm.controls.password.value)){
      this.errorLogin = "Mot de passe invalide. Exemple : au moins 6 caractères et un nombre";
      return
    }
    if (this.registerForm.valid){
      this.user = this.registerForm.value;
      this._authService.register(this.user).subscribe(res => 
                                              {
                                                let errorField: string = this._authService.isLogged(res, this.user);
                                                if (errorField == 'email')
                                                  this.errorLogin = 'Email existant.'
                                                if (errorField == 'pseudo')
                                                  this.errorLogin = 'Pseudo existant.'
                                              }, error => this.errorMessage = <any>error);    
    }

  }
}
