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
export class ArticleService {
  private articleUrl = this.config.apiEndpoint + "article";
  private headers: Headers;
  private options: RequestOptions;

  constructor(private _http: Http, @Inject(APP_CONFIG) private config: AppConfig) { 
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    //this.headers.append('Access-Control-Allow-Origin', '*');
    this.options = new RequestOptions({ headers: this.headers });

  };

  getArticles(): Observable<IArticle[]> {
    return this._http.get(this.articleUrl, this.options)
      .map((response: Response) => <IArticle[]>response.json())
      .catch(this.handleError);

  }

  likeArticle(article: IArticle): Observable<IArticle[]> {
    let body = JSON.stringify(article);
    return this._http.put(this.articleUrl + '/'+article._id, body, this.options)
      .map((response: Response) => <IArticle[]>response.json())
      .catch(this.handleError);

  }
  
  getTopNArticles(num: Number): Observable<IArticle[]> {
    return this._http.get(this.articleUrl, { params: { limit: num, sort: '-views' } })
      .map((response: Response) => <IArticle[]>response.json())
      .catch(this.handleError);
  }

  getArticleByUrl(url: String): Observable<IArticle> {
    return this._http.get(this.articleUrl, { params: { url: url } })
      .map((response: Response) => <IArticle>response.json())
      .catch(this.handleError);
  }

  getArticleByText(text: String): Observable<IArticle[]> {
    return this._http.get(this.articleUrl)
      .map((response: Response) => <IArticle[]>response.json())
      .map((articles: Array<IArticle>) => articles.filter(article => article.tags.indexOf(text) > -1))
      .catch(this.handleError);
  }

  getArticlesByCategry(category: String): Observable<IArticle[]> {
    return this._http.get(this.articleUrl, { params: { category: category } })
      .map((response: Response) => <IArticle[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}