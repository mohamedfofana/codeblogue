import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { IUser } from '../services/models/user';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service'
import { SessionService } from '../services/session.service'

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  errorLogin: string;
  registerForm: FormGroup;
  user: IUser;

  constructor(private _formBuilder: FormBuilder, private _authService: AuthService, private _sessionService: SessionService, private _router: Router) { 
    this.registerForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(70)]]
    });
  }

  ngOnInit() {
    
  }

  onSubmit(): void {
    if (this.registerForm.valid){
      this.user = this.registerForm.value;
      this._authService.register(this.user).subscribe(res => this.isLogged(res), error => this.errorMessage = <any>error);    
    }

  }

  isLogged(res: Response): void{
    let newRoute = res.url.split('/')[3];
    if (newRoute == 'login'){
        this.errorLogin = 'Login ou mot de passe incorrect';
        this._sessionService.setLogged(false);
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('currentUserEmail');
        localStorage.removeItem('userLogged');
    }else{
      this.user.name = res.url.split('/')[3];
        this.errorLogin = '';
        localStorage.setItem('currentUserName', JSON.stringify(this.user.name));
        localStorage.setItem('currentUserEmail', JSON.stringify(this.user.email));
        localStorage.setItem('userLogged', 'true');
        this._sessionService.setLogged(true);
        let currentUser: IUser = ({name: this.user.name, email: this.user.email, password: ''});
        this._sessionService.setUser(currentUser);
    }
    this._router.navigate([newRoute]);
  }

}
