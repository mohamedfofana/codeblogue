import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'app-nodemailer',
  templateUrl: './nodemailer.component.html'
})
export class NodemailerComponent implements OnInit {

  @Input() article: IArticle;

  constructor() { }

  ngOnInit() {
  }

}
