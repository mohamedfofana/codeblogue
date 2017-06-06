import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { IContact } from './models/contact';

@Injectable()
export class ContactService {
  private contactUrl = "http://localhost:3000/api/contact"
  constructor(private _http: Http) { };

  sendMail(contact: IContact): Observable<IContact[]> {
      console.log("sending email ...");
    return this._http.post(this.contactUrl, contact)
            .map((response: Response) => <IContact[]> response.json())
            .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
