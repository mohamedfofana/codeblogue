import { OnDestroy, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { IArticle } from "app/services/models/article";

export abstract class ArticleBaseViewcomponent {
  @Input() article: IArticle;
  nbComments: number = 0;
  errorMessage: string;
}
