import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

import { IArticle } from './models/article';
import { IComment } from './models/comment';
import { IReply } from './models/reply';
import { GenericService } from './generic.service';

@Injectable()
export class ArticleService extends GenericService {
  private articleUrl = this.config.apiEndpoint + "article";
  private options;

  constructor(private _http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) { 
    super();
    this.options = this.config.options;

  };

  getArticles() {
    return this._http.get<IArticle[]>(this.articleUrl, this.options)
      .catch(this.handleError);

  }

  updateArticle(article: IArticle){
    let body = JSON.stringify(article);
    return this._http.put(this.articleUrl + '/'+article._id, body, this.options)
      .catch(this.handleError);

  }

  likeArticle(article: IArticle) {
    let body = JSON.stringify(article);
    return this._http.put(this.articleUrl + '/'+article._id, body, this.options)
      .catch(this.handleError);

  }
  
  getTopNArticles(num: Number) {
    let httpParams = new HttpParams().set('limit', num.toString()).set('sort', '-rate').set('visible', "true");
    return this._http.get<IArticle[]>(this.articleUrl, { params: httpParams})
      .catch(this.handleError);
  }

  getArticleByTitle(title: String){
    let httpParams = new HttpParams().set('titre', title.toString());
    return this._http.get<IArticle[]>(this.articleUrl, { params: httpParams})
      .catch(this.handleError);
  }

  getArticleByUrl(url: String){
    let httpParams = new HttpParams().set('url', url.toString());
    return this._http.get<IArticle>(this.articleUrl, { params: httpParams})
      .catch(this.handleError);
  }

  getArticleByText(text: String){
    return this._http.get(this.articleUrl)
      .map((articles: Array<IArticle>) => articles.filter(article => article.tags.indexOf(text) > -1))
      .catch(this.handleError);
  }

  getArticlesByCategry(category: String){
    let httpParams = new HttpParams().set('category', category.toString());
    return this._http.get<IArticle[]>(this.articleUrl, { params: httpParams })
      .catch(this.handleError);
  }

}