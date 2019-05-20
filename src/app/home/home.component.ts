import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IArticle } from '../services/models/article';
import { ArticleService } from '../services/article.service';
import { take } from 'rxjs/operators';

@Component({
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  articles: IArticle[];
  errorMessage: string;
  constructor(private _articleService: ArticleService) { }

  ngOnInit(): void {
      this._articleService.getTopNArticles(5).pipe(take(1)).subscribe(articles => this.articles = articles, error => this.errorMessage = <any>error);
  }

}
