import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html'
})
export class CarouselComponent implements OnInit {
  
  @Input() article: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
