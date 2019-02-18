import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

import { IContact } from './models/contact';
import { GenericService } from './generic.service';

@Injectable()
export class ContactService extends GenericService{
  private contactUrl = this.config.apiEndpoint + "contact";

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { 
    super();
  };


  sendMail(contact: IContact) {
    return this._http.post(this.contactUrl, contact)
            .catch(this.handleError);
  }
}
