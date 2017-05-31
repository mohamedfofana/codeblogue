import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'app-nodemailerfixit',
  templateUrl: './nodemailerfixit.component.html'
})
export class NodemailerfixitComponent implements OnInit {

  @Input() article: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
