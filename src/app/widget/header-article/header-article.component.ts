import { Component, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'header-article',
  templateUrl: './header-article.component.html'
})
export class HeaderArticleComponent {
  @Input() article: IArticle;
  @Input() nbComments: number;
}
