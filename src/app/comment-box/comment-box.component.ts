import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { IArticle } from '../services/models/article';
import { IComment } from '../services/models/comment';
import { IReply } from '../services/models/reply';

import { ArticleService } from '../services/article.service';
import { CommentService } from '../services/comment.service';
import { ReplyService } from '../services/reply.service';

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

  constructor(private _articleService: ArticleService, private _commentService: CommentService, private _replyService: ReplyService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this._formBuilder.group({
      auteur: ['', [Validators.required, Validators.maxLength(70)]],
      contenu: ['', [Validators.required, Validators.maxLength(1000)]]
    });
    this.replyForm = this._formBuilder.group({
      auteur: ['', [Validators.required, Validators.maxLength(70)]],
      contenu: ['', [Validators.required, Validators.maxLength(1000)]]
    });

    this.initComments();
    this.initReplies();

    this.showHideComment();
  }

  initComments(): void {
    this.comment = {} as IComment;
    this._commentService.getCommentsByArticle(this.article.titre)
      .subscribe(comments => this.comments = comments, error => this.errorMessage = <any>error);
  }

  initReplies(): void {
    this.reply = {} as IReply;
    this._replyService.getRepliesByArticle(this.article.titre)
      .subscribe(replies => this.replies = replies, error => this.errorMessage = <any>error);
  }
  
  saveComment(): void {
    this.comment.article_titre = this.article.titre;
    this.comment.auteur = this.commentForm.value.auteur;
    this.comment.contenu = this.commentForm.value.contenu;
    this.comment.creation = new Date();
    this.comment.likes = 0;

    this._commentService.saveComment(this.comment).subscribe(
      result => this.initComments(),
      error => this.errorMessage = <any>error
    );
    this.showHideComment();
  }

  saveReply(comment_auteur: String, comment_creation: Date, elementID: String): void {
    this.reply.article_titre = this.article.titre;
    this.reply.auteur = this.replyForm.value.auteur;
    this.reply.contenu = this.replyForm.value.contenu;
    this.reply.likes = 0;
    this.reply.comment_auteur = comment_auteur;
    this.reply.comment_creation = comment_creation;

    this._replyService.saveReply(this.reply).subscribe(
      result => this.initReplies(),
      error => this.errorMessage = <any>error);
    this.showHideReply(elementID);
  }

  likeArticle(article: IArticle): void {
    article.likes = article.likes + 1;
    this._articleService.likeArticle(article).subscribe(
      result => result,
      error => this.errorMessage = <any>error
    );
  }

  likeComment(comment: IComment): void {
    comment.likes = comment.likes + 1;
    this._commentService.likeComment(comment).subscribe(
      result => result,
      error => this.errorMessage = <any>error
    );
  }

  likeReply(reply: IReply) {
    reply.likes = reply.likes + 1;
    this._replyService.likeReply(reply).subscribe(
      result => result,
      error => this.errorMessage = <any>error
    );
  }

  showHideComment(): void {
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
    $('textarea.replyTextArea').show();
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
        $('.replyAddSection').hide();

        $('.commentAddSection').show();
      } else {
        $('input.replySubmit').show();
        $('button.replyAuteur').show();

        $('input.commentAuteur').hide();
        $('button.commentSubmit').hide();
        $('.replyAddSection').show();
      }

    });
  }

}
