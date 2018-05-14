import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';
import { CommentService } from '../../services/comment.service';
import { ReplyService } from '../../services/reply.service';

@Component({
  selector: 'app-nodemailer',
  templateUrl: './nodemailer.component.html'
})
export class NodemailerComponent implements OnInit {

  @Input() article: IArticle;
  nbComments : number = 0;
  errorMessage: string;

  constructor(private _commentService: CommentService,
    private _replyService: ReplyService) { }

  ngOnInit() {
    this._commentService.getCommentsByArticle(this.article.titre).subscribe(data => this.nbComments += data.length, error => this.errorMessage = <any>error);    
    this._replyService.getRepliesByArticle(this.article.titre).subscribe(data => this.nbComments += data.length, error => this.errorMessage = <any>error);  
  }

}
