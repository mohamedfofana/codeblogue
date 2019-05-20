import { Component, OnInit } from "@angular/core";
import { IArticle } from 'app/services/models/article';
import { ArticleService } from 'app/services/article.service';
import { take } from 'rxjs/operators';


@Component({
  selector: "app-articles",
  templateUrl: "./article.component.html"
})
export class ArticleComponent implements OnInit{
  articles: IArticle[];
  errorMessage: string;
  constructor(private _articleService: ArticleService) { }

  ngOnInit(): void {
      this._articleService.getVisibleArticles().pipe(take(1)).subscribe(articles => this.articles = articles, error => this.errorMessage = <any>error);
  }
}
