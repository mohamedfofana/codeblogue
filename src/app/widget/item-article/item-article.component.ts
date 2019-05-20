import { Component, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'item-article',
  templateUrl: './item-article.component.html'
})
export class ItemArticleComponent {
  @Input() article: IArticle;
}
