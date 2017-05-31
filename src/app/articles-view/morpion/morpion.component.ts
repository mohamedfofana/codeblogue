import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.component.html'
})
export class MorpionComponent implements OnInit {

  @Input() article: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
