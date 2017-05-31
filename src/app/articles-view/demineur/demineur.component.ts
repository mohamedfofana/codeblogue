import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';


@Component({
  selector: 'app-demineur',
  templateUrl: './demineur.component.html'
})

export class DemineurComponent implements OnInit {
  
  @Input() article: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
