import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { ReplyService } from '../../services/reply.service';
import { take } from 'rxjs/operators';
import { ArticleBaseViewcomponent } from '../article-base-view.component';

@Component({
  selector: 'app-windows',
  templateUrl: './windows.component.html'
})
export class WindowsComponent extends ArticleBaseViewcomponent implements OnInit{
  constructor(
    private _commentService: CommentService,
    private _replyService: ReplyService
  ) {
    super();
  }

  ngOnInit() {
    this._commentService
      .getCommentsByArticle(this.article.titre)
      .pipe(take(1))
      .subscribe(
        data => (this.nbComments += data.length),
        error => (this.errorMessage = <any>error)
      );
    this._replyService
      .getRepliesByArticle(this.article.titre)
      .pipe(take(1))
      .subscribe(
        data => (this.nbComments += data.length),
        error => (this.errorMessage = <any>error)
      );
  }
}
