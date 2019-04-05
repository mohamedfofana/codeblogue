import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

import { IReply } from './models/reply';
import { GenericService } from './generic.service';

@Injectable()
export class ReplyService extends GenericService{
  private replyUrl = this.config.apiEndpoint + "reply";

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    super();
  }

  getRepliesByArticle(titre: String){
    let httpParams = new HttpParams().set('article_titre', titre.toString()).set('sort', '-creation');
    return this._http.get<IReply[]>(this.replyUrl, {params: httpParams})
      .catch(this.handleError);

  }

  likeReply(reply: IReply) {
    let body = JSON.stringify(reply);
    return this._http.put<IReply>(this.replyUrl + '/'+reply._id, body, this.config.options)
      .catch(this.handleError);

  }

  saveReply(reply: IReply) {
    return this._http.post<IReply[]>(this.replyUrl, reply)
      .catch(this.handleError);

  }
}
