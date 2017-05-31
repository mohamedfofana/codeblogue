import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { IArticle } from '../services/models/article';
import { IComment } from '../services/models/comment';
import { IReply } from '../services/models/reply';

import { ArticleService } from '../services/article.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'commentBox',
  templateUrl: './comment-box.component.html'
})
export class CommentBoxComponent implements OnInit {
  @Input() article: IArticle;
  comments: IComment[];
  comment: IComment;
  replies: IReply[];
  reply: IReply;
  commentForm: FormGroup;
  replyForm: FormGroup;
  errorMessage: string;

  constructor(private _articleService: ArticleService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this._formBuilder.group({
      auteur: ['', [Validators.required, Validators.maxLength(70)]],
      contenu: ['', [Validators.required, Validators.maxLength(1000)]]
    });
    this.replyForm = this._formBuilder.group({
      auteur: ['', [Validators.required, Validators.maxLength(70)]],
      contenu: ['', [Validators.required, Validators.maxLength(1000)]]
    });

    this._articleService.getArticleComments(this.article.titre)
      .subscribe(comments => this.comments = comments, error => this.errorMessage = <any>error);
    this._articleService.getCommentReplies(this.article.titre)
      .subscribe(replies => this.replies = replies, error => this.errorMessage = <any>error);
  }

  saveComment(): void {
    console.log(this.comment);
    this._articleService.saveComment(this.comment);
  }

  saveReply(comment_auteur: String, comment_creation: Date): void {
    console.log(this.reply);
    this._articleService.saveReply(this.reply);
  }

  likeArticle(): void {
    console.log(this.article);
    // this._articleService.;
  }

  likeComment(auteur: String, creation: Date): void {
    console.log(auteur);
    console.log(creation);
  }

  likeReply(auteur: String, creation: Date, comment_auteur: String, comment_creation: Date) {
    console.log(auteur);
    console.log(creation);
    console.log(comment_auteur);
    console.log(comment_creation);
  }

  showHideReply(elementID: String) {
    var target = $('#' + elementID);
    if (target.css('display') == 'block') {
      target.css('display', 'none');
      $('.commentAddSection').show();
    } else {
      target.css('display', 'block');
      $('.commentAddSection').hide();
    }
  }

}
