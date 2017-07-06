import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

@Injectable()
export class AuthService {
  private url = this.config.apiEndpoint + "auth/google";
  private loginUrl = this.config.apiEndpoint + "auth/login";
  private registerUrl = this.config.apiEndpoint + "auth/register";
  private headers: Headers;
  private options: RequestOptions;

  constructor(private _http: Http, @Inject(APP_CONFIG) private config: AppConfig) { 
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
  /*authenticated() {
    return this.http.get(this._authenticatedApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this._logoutApi, <RequestOptionsArgs> {withCredentials: true})
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }
*/
  register(user) {
    let body = JSON.stringify(user);
    return this._http.post(this.registerUrl, body, this.options)
                    .map((res: Response) => res)
                    .catch(this.handleError);
  }
  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}