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

    this.hideDiv();
  }

  hideDiv(): void {
    $('input.commentAuteur').hide();
    $('button.commentSubmit').hide();
    $('textarea.commentTextArea').focus(function () {
      $(this).attr('rows', 5);
      $('input.commentAuteur').show();
      $('button.commentSubmit').show();
    });
    
    $('textarea.commentTextArea').blur(function () {
      if ($(this).val().length == 0) {
        $(this).attr('rows', 1);
        $('input.commentAuteur').hide();
        $('button.commentSubmit').hide();
      } else {
        $('input.commentSubmit').show();
        $('button.commentAuteur').show();
      }

    });
  }
  saveComment(): void {
    console.log(this.comment);
    this._articleService.saveComment(this.comment);
  }

  saveReply(comment_auteur: String, comment_creation: Date): void {
    console.log(this.reply);
    this._articleService.saveReply(this.reply);
  }

  likeArticle(article: IArticle): void {
    article.likes = article.likes + 1;
    this._articleService.likeArticle(article);
  }

  likeComment(comment: IComment): void {
    comment.likes = comment.likes + 1;
    this._articleService.likeComment(comment);
  }

  likeReply(reply: IReply) {
    reply.likes = reply.likes + 1;
    this._articleService.likeReply(reply);
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

    $('input.replyAuteur').hide();
    $('button.replySubmit').hide();
    $('textarea.replyTextArea').focus(function () {
      $(this).attr('rows', 5);
      $('input.replyAuteur').show();
      $('button.replySubmit').show();
    });
    
    $('textarea.replyTextArea').blur(function () {
      if ($(this).val().length == 0) {
        $(this).attr('rows', 1);
        $('input.replyAuteur').hide();
        $('button.replySubmit').hide();
      } else {
        $('input.replySubmit').show();
        $('button.replyAuteur').show();
      }

    });
  }

}
