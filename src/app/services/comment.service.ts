import { Injectable, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

import { IArticle } from './models/article';
import { IComment } from './models/comment';
import { IReply } from './models/reply';

@Injectable()
export class CommentService {
  private commentUrl = this.config.apiEndpoint + "comment";
  private headers: Headers;
  private options: RequestOptions;

  constructor(private _http: Http, @Inject(APP_CONFIG) private config: AppConfig) { 
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.options = new RequestOptions({ headers: this.headers });

  }

  getCommentsByArticle(titre: String): Observable<IComment[]> {
    return this._http.get(this.commentUrl, {params: {article_titre: titre, sort: '-creation'}})
      .map((response: Response) => <IComment[]>response.json())
      .catch(this.handleError);

  }
  
  saveComment(comment: IComment): Observable<IComment[]> {
    return this._http.post(this.commentUrl, comment)
      .map((response: Response) => <IComment[]>response.json())
      .catch(this.handleError);

  }
  
  likeComment(comment: IComment): Observable<IComment[]> {
    let body = JSON.stringify(comment);
    return this._http.put(this.commentUrl + '/' + comment._id, body, this.options)
      .map((response: Response) => <IComment[]>response.json())
      .catch(this.handleError);

  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}