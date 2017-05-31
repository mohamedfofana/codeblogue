import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

import { IArticle } from './models/article';
import { IComment } from './models/comment';
import { IReply } from './models/reply';

@Injectable()
export class ArticleService {
  private articleUrl = "http://localhost:3000/article"
  private commentUrl = "http://localhost:3000/comment"
  private replyUrl = "http://localhost:3000/reply"
  constructor(private _http: Http) { };

  getArticles(): Observable<IArticle[]> {
    return this._http.get(this.articleUrl)
      .map((response: Response) => <IArticle[]>response.json())
      .catch(this.handleError);

  }

  getArticleComments(titre: String): Observable<IComment[]> {
    return this._http.get(this.commentUrl, {params: {article_titre: titre, sort: 'creation'}})
      .map((response: Response) => <IComment[]>response.json())
      .catch(this.handleError);

  }

  getCommentReplies(titre: String): Observable<IReply[]> {
    return this._http.get(this.replyUrl, {params: {article_titre: titre, sort: 'creation'}})
      .map((response: Response) => <IReply[]>response.json())
      .catch(this.handleError);

  }
  
  saveComment(comment: IComment): Observable<IComment[]> {
    return this._http.post(this.commentUrl, comment)
      .map((response: Response) => <IComment[]>response.json())
      .catch(this.handleError);

  }
  
  saveReply(reply: IReply): Observable<IReply[]> {
    return this._http.post(this.commentUrl, reply)
      .map((response: Response) => <IReply[]>response.json())
      .catch(this.handleError);

  }

  getTopNArticles(num: Number): Observable<IArticle[]> {
    return this._http.get(this.articleUrl, { params: { limit: num, sort: 'views' } })
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
