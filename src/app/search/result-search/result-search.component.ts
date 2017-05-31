import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '../../services/models/article';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-result-search',
  templateUrl: './result-search.component.html'
})
export class ResultSearchComponent implements OnInit {

constructor(private _articleService: ArticleService, private _route: ActivatedRoute,) { }
  searchText: String;
  errorMessage: string;
  articles: IArticle[];

  ngOnInit() {
     this._route.params.subscribe(params => {
       this.doInit(params['q']); 
    });
  }

   doInit(searchText: string): void {
     this.searchText = searchText;
     this._articleService.getArticleByText(this.searchText).subscribe(articles => this.articles = articles, error => this.errorMessage = <any>error);
  }
}
