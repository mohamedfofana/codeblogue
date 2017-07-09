import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

import { SessionService } from './session.service'
import { IUser } from './models/user';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private url = this.config.apiEndpoint + "auth/google";
  private loginUrl = this.config.apiEndpoint + "auth/signin";
  private signupUrl = this.config.apiEndpoint + "auth/signup";
  private headers: Headers;
  private options: RequestOptions;

  constructor(private _http: Http, @Inject(APP_CONFIG) private config: AppConfig, private _router: Router, private _sessionService: SessionService) { 
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });

  };

  registerGoogle(): Observable<any> {
    return this._http.get(this.url, this.options)
      .map((response: Response) => response.json())
      .catch(this.handleError);

  }

  login(user) {
    let body = JSON.stringify(user);
    return this._http.post(this.loginUrl, body, this.options)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  register(user) {
    let body = JSON.stringify(user);
    return this._http.post(this.signupUrl, body, this.options)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }

  isLogged(res: Response, user: IUser): string{
    let newRoute = res.url.split('/')[3];
    let errorMessage = res.url.split('/')[4];
    if (newRoute == 'signup'){
        this._sessionService.setLogged(false);
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('userLogged');
        return errorMessage;
    }
    if (newRoute == 'signin'){
        this._sessionService.setLogged(false);
        localStorage.removeItem('currentUserName');
        localStorage.removeItem('userLogged');
        return errorMessage;
    }else{
        user.username = res.url.split('/')[3];
        localStorage.setItem('currentUserName', JSON.stringify(user.username));
        localStorage.setItem('userLogged', 'true');
        this._sessionService.setLogged(true);
        let currentUser: IUser = ({username: user.username, email: user.email, password: ''});
        this._sessionService.setUser(currentUser);
        this._router.navigate([newRoute]);
        return '';
    }
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}