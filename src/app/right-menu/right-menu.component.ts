import { Component, OnInit } from '@angular/core';

import { ArticleService } from '../services/article.service';

import { IArticle } from '../services/models/article';

@Component({
  selector: 'app-right-menu',
  templateUrl: './right-menu.component.html'
})

export class RightMenuComponent implements OnInit {
  articles: IArticle[];
  nTopArticles: number;
  constructor(private _articleService: ArticleService) { }

  ngOnInit() {
    this.nTopArticles = 7;
    this._articleService.getTopNArticles(this.nTopArticles).subscribe(articles => this.articles = articles, error => this.handleError(error));
  }
  private handleError(error: Response) {
    console.error(error);
  }

}
