import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'app-grunt',
  templateUrl: './grunt.component.html'
})
export class GruntComponent implements OnInit {

  @Input() article: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
