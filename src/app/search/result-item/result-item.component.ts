import { Component, Input } from '@angular/core';

import { IArticle } from '../../services/models/article'

@Component({
  selector: 'resultsearchitem',
  templateUrl: './result-item.component.html'
})
export class ResultItemComponent {
  @Input() article: IArticle;
}
