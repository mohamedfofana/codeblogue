import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IArticle } from '../services/models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  articleTitle: string = "Details de l'article ";
  errorMessage: string;
  article: IArticle;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _articleService: ArticleService) {
  }

  ngOnInit(): void {
    let titre = +this._route.params.subscribe(params => this.articleTitle = params['titre']);
    this._articleService.getArticleByTitle(this.articleTitle).subscribe(article => this.article = article, error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this._router.navigate(['/articles']);
  }

}
