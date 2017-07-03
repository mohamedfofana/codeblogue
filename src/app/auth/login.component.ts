import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../services/models/user';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  loginForm: FormGroup;
  user: IUser;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _router: Router) { 
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }

  ngOnInit() {
    //this._authService.registerGoogle().subscribe(response => console.log(response), error => this.errorMessage = <any>error);    
  }

  onSubmit(): void {
    if (this.loginForm.valid){
      this.user = this.loginForm.value;
      this._authService.login(this.user).subscribe(res => this.isLogged(res), error => this.errorMessage = <any>error);    
    }
    //this._router.navigate(['/articles']);
  }

  isLogged(res: Response): void{
    console.log(res);
    //localStorage.setItem('user', res;
    this._router.navigate([res.url.substr(21)]);
  }

  getErrorMessage(): void {
  }

}
