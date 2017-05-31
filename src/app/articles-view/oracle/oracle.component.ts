import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'app-oracle',
  templateUrl: './oracle.component.html'
})
export class OracleComponent implements OnInit {

  @Input() article: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
