import { Component, OnInit, Input } from '@angular/core';

import { IArticle } from '../../services/models/article';
import { CommentService } from '../../services/comment.service';
import { ReplyService } from '../../services/reply.service';

@Component({
  selector: 'preview-article',
  templateUrl: './preview-article.component.html'
})
export class PreviewArticleComponent implements OnInit {
  @Input() article: IArticle;
  nbComments: number;
  nbReplies: number;
  errorMessage: string;
  constructor(private _commentService: CommentService, private _replyService: ReplyService) { }

  ngOnInit(): void {
    this._commentService.getCommentsByArticle(this.article.titre.toString())
      .subscribe(comments => this.nbComments = comments.length, error => this.errorMessage = <any>error);
    this._replyService.getRepliesByArticle(this.article.titre.toString())
      .subscribe(replies => this.nbReplies = replies.length, error => this.errorMessage = <any>error);
  }

}
