import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

import { IComment } from './models/comment';
import { GenericService } from './generic.service';

@Injectable()
export class CommentService extends GenericService{
  private commentUrl = this.config.apiEndpoint + "comment";

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    super();
  }

  getCommentsByArticle(titre: String) {
    let httpParams = new HttpParams().set('article_titre', titre.toString()).set('sort', '-creation');
    return this._http.get<IComment[]>(this.commentUrl, {params: httpParams})
      .catch(this.handleError);

  }

  saveComment(comment: IComment) {
    return this._http.post<IComment>(this.commentUrl, comment)
      .catch(this.handleError);

  }

  likeComment(comment: IComment) {
    let body = JSON.stringify(comment);
    return this._http.put<IComment[]>(this.commentUrl + '/' + comment._id, body, this.config.options)
      .catch(this.handleError);

  }
}
