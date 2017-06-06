import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { IArticle } from './models/article';
import { IComment } from './models/comment';
import { IReply } from './models/reply';

@Injectable()
export class ReplyService {
  private replyUrl = "http://localhost:3000/api/reply";
  private headers: Headers;
  private options: RequestOptions;

  constructor(private _http: Http) { 
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });

  };

  getRepliesByArticle(titre: String): Observable<IReply[]> {
    return this._http.get(this.replyUrl, {params: {article_titre: titre, sort: '-creation'}})
      .map((response: Response) => <IReply[]>response.json())
      .catch(this.handleError);

  }
  
  likeReply(reply: IReply): Observable<IReply[]> {
    let body = JSON.stringify(reply);
    return this._http.put(this.replyUrl + '/'+reply._id, body, this.options)
      .map((response: Response) => <IReply[]>response.json())
      .catch(this.handleError);

  }

  saveReply(reply: IReply): Observable<IReply[]> {
    return this._http.post(this.replyUrl, reply)
      .map((response: Response) => <IReply[]>response.json())
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}