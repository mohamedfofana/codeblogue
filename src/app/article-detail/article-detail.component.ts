import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IArticle } from '../services/models/article';
import { ArticleService } from '../services/article.service';

@Component({
  templateUrl: './article-detail.component.html'
})

export class ArticleDetailComponent implements OnInit, OnChanges {

  articleTitle: string = "";
  url: string;
  errorMessage: string;
  article: IArticle;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _articleService: ArticleService) {
  }

  ngOnInit(): void {  
      // subscribe permet de souscrire au parmètre de l'url. dès que la variable change la méthode associée est appelée
      this._route.params.subscribe(params => this.getArticle(params['url']));
  }

  ngOnChanges(): void {
    console.log("onChange");
  }

  getArticle(url: string): void {
    this.url = url;
    this._articleService.getArticleByUrl(this.url).subscribe(article => this.article = article, error => this.errorMessage = <any>error);    
  }

  onBack(): void {
    this._router.navigate(['/articles']);
  }

}
