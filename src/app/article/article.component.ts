import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IArticle } from '../services/models/article';
import { ArticleService } from '../services/article.service';

@Component({
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit {
  categoryArticles: string = '';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  listFilter: string;
  errorMessage: string;

  articles: IArticle[];

  constructor(private _articleService: ArticleService, private _route: ActivatedRoute,) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
       this.categoryArticles = params['cat']; 
    });
    this._articleService.getArticlesByCategry(this.categoryArticles).subscribe(articles => this.articles = articles, error => this.errorMessage = <any>error);
  }

  toggleImage(): void {
        this.showImage = !this.showImage;
  }

   onRatingClicked(message: string): void {
        //this.pageTitle = 'Liste des articles de la catégorie: ' + message;
    }
}
