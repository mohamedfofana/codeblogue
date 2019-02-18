import { Injectable, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

import { SessionService } from './session.service'
import { IUser } from './models/user';
import { IHttpPassportResponse } from './models/httppassportresponse';

@Injectable()
export class AuthService {
  private url = this.config.apiEndpoint + "auth/";
  private loginUrl = this.config.apiEndpoint + "auth/signin";
  private signupUrl = this.config.apiEndpoint + "auth/signup";
  private headers: HttpHeaders;
  private options;

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig, private _sessionService: SessionService,
    private _location: Location) {
      this.headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.headers.append('Access-Control-Allow-Origin', '*');
     this.options = ({ headers: this.headers });
 };

  registerSocialMedia(group: string): void {
    window.open(this.url + group, '_self');
  }

  login(user:IUser): any {
    let body = JSON.stringify(user);
    return this._http.post(this.loginUrl, body, this.options)
      .catch(this.handleError);
  }

  register(user): any {
    let body = JSON.stringify(user);
    return this._http.post(this.signupUrl, body, this.options)
      .catch(this.handleError);
  }

  logUser(username: string, email?: string): void {
    localStorage.setItem('currentUserName', username);
    localStorage.setItem('userLogged', 'true');
    this._sessionService.setLogged(true);
    let currentUser: IUser = ({ username: username, email: '', password: '' });
    this._sessionService.setUser(currentUser);
  }

  isLogged(res: IHttpPassportResponse, user: IUser): string {
    if (res.type == 'error') {
      this._sessionService.setLogged(false);
      localStorage.removeItem('currentUser');
      localStorage.removeItem('currentUserEmail');
      localStorage.removeItem('userLogged');
      return res.error;
    } 
    if (res.type == 'success') {
      localStorage.setItem('currentUser', JSON.stringify(res.user));
      localStorage.setItem('currentUserEmail', JSON.stringify(res.user.email));
      localStorage.setItem('userLogged', 'true');
      this._sessionService.setLogged(true);
      this._sessionService.setUser(res.user);
      this._location.back();
      return '';
    }
  }
  private handleError(error: Response) {
    return Observable.throw(error.json() || 'Server error');
  }
}