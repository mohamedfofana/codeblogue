import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { IArticle } from "../services/models/article";
import { ArticleService } from "../services/article.service";
import { take } from "rxjs/operators";

@Component({
  templateUrl: "./article-detail.component.html"
})
export class ArticleDetailComponent implements OnInit {
  articleTitle: string = "";
  url: string;
  errorMessage: string;
  article: IArticle;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _articleService: ArticleService
  ) {
  }

  ngOnInit(): void {
    // subscribe permet de souscrire au parmètre de l'url. dès que la variable change la méthode associée est appelée
    this._route.params.subscribe(params => this.getArticle(params["url"]));
  }

  getArticle(url: string): void {
    this.url = url;
    this._articleService
      .getArticleByUrl(this.url)
      .pipe(take(1))
      .subscribe(
        article => (this.article = article),
        error => (this.errorMessage = <any>error)
      );
  }

  onBack(): void {
    this._router.navigate(["/articles"]);
  }
}
