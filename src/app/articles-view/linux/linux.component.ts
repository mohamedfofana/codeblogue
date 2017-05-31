import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
  selector: 'app-linux',
  templateUrl: './linux.component.html'
})
export class LinuxComponent implements OnInit {
  @Input() article: IArticle;
  constructor() { }

  ngOnInit() {
  }

}
