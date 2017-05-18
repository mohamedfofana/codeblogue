import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { IArticle } from './models/article';

@Injectable()
export class ArticleService {
  private articleUrl = "http://localhost:3000/article"
  constructor(private _http: Http) { };

  getArticles(): Observable<IArticle[]> {
    console.log('Getting All articles');
    return this._http.get(this.articleUrl)
            .map((response: Response) => <IArticle[]> response.json())
            .catch(this.handleError);
    
  }

  getTopNArticles(num: Number): Observable<IArticle[]> {
    return this._http.get(this.articleUrl, {params: {limit: num, sort: 'views'}})
            .map((response: Response) => <IArticle[]> response.json())
            .catch(this.handleError);
  }

  getArticleByTitle(title: String): Observable<IArticle> {
    return this._http.get(this.articleUrl, {params: {titre: title}})
            .map((response: Response) => <IArticle> response.json())
            .catch(this.handleError);
  }

  getArticlesByCategry(category: String): Observable<IArticle[]> {
    return this._http.get(this.articleUrl, {params: {category: category}})
            .map((response: Response) => <IArticle[]> response.json())
            .catch(this.handleError);
  }

  private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
