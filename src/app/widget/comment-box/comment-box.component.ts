import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { IArticle } from '../../services/models/article';
import { IComment } from '../../services/models/comment';
import { IReply } from '../../services/models/reply';
import { IUser } from '../../services/models/user';

import { ArticleService } from '../../services/article.service';
import { CommentService } from '../../services/comment.service';
import { ReplyService } from '../../services/reply.service';
import { SessionService } from '../../services/session.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'commentBox',
  styleUrls : ['./comment-box.component.css'],
  templateUrl: './comment-box.component.html'
})
export class CommentBoxComponent implements OnInit {
  @Input() article: IArticle;
  dbArticle: IArticle; // to get the article in the db. the current article in session may not be the current db article
  comments: IComment[];
  comment: IComment;
  user: IUser;
  isLoggedIn: boolean;
  numComments: number = 0;
  numReplies: number = 0;
  replies: IReply[];
  reply: IReply;
  commentForm: FormGroup;
  replyForm: FormGroup;
  errorMessage: string;
  rate: number;

  constructor(private _articleService: ArticleService, private _commentService: CommentService,
              private _replyService: ReplyService, private _formBuilder: FormBuilder,
) { }

  ngOnInit() {
    this.commentForm = this._formBuilder.group({
      author: ['', [Validators.required, Validators.maxLength(50)]],
      email: '',
      contenu: ['', [Validators.required, Validators.maxLength(1000)]]
    });
    this.replyForm = this._formBuilder.group({
      author: ['', [Validators.required, Validators.maxLength(50)]],
      email: '',
      contenu: ['', [Validators.required, Validators.maxLength(1000)]]
    });
    if(this.article.raters>0){
      this.rate = Math.floor(this.article.rates/this.article.raters);
    }
    this.initComments();
    this.initReplies();
    this.showHideComment();
  }

  onRatingClicked(rating: number): void {
    this._articleService.getArticleByUrl(this.article.url).subscribe(article =>
            {
             this.dbArticle = article[0];
              this.dbArticle.rates += rating;
              this.dbArticle.raters += 1;
              this.dbArticle.rate = Math.floor(this.dbArticle.rates/this.dbArticle.raters);
              this.article.rate = this.dbArticle.rate;
              this._articleService.updateArticle(this.dbArticle).subscribe(result => result, error => this.errorMessage = <any>error);
            }
            , error => this.errorMessage = <any>error);
  }

  initComments(): void {
    this.comment = {} as IComment;
    this._commentService.getCommentsByArticle(this.article.titre)
      .subscribe(comments => this.loadComments(comments), error => this.errorMessage = <any>error);

  }

  loadComments(comments: IComment[]){
    this.comments = comments;
    if (comments){
      this.numComments = comments.length;
    }
  }

  loadReplies(replies: IReply[]){
    this.replies = replies;
    if (replies){
      this.numReplies = replies.length;
    }
  }

  initReplies(): void {
    this.reply = {} as IReply;
    this._replyService.getRepliesByArticle(this.article.titre)
      .subscribe(replies => this.loadReplies(replies), error => this.errorMessage = <any>error);
  }

  saveComment(): void {
    this.comment.article_titre = this.article.titre;
    this.comment.author = this.commentForm.value.author;
    this.comment.email = this.commentForm.value.email;
    this.comment.contenu = this.commentForm.value.contenu;
    this.comment.creation = new Date();
    this.comment.likes = 0;
    this._commentService.saveComment(this.comment).subscribe(
      result => this.initComments(),
      error => this.errorMessage = <any>error
    );
    this.showHideComment();
  }

  saveReply(comment_author: String, comment_creation: Date, elementID: String): void {
    this.reply.article_titre = this.article.titre;
    this.reply.author = this.replyForm.value.author;
    this.reply.email = this.replyForm.value.email;
    this.reply.contenu = this.replyForm.value.contenu;
    this.reply.likes = 0;
    this.reply.comment_author = comment_author;
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
    $('textarea.commentTextArea').val('');
    $('textarea.commentTextArea').attr('rows', 1);
    $('button.commentSubmit').hide();
    $('#commentSubmit').prop('disabled', true);
    $('button.commentSubmit').show();

    $('textarea.commentTextArea').focus(function () {
      $(this).attr('rows', 5);
    });

    $('textarea.commentTextArea').blur(function () {
      if ($(this).val().length == 0) {
        $(this).attr('rows', 1);
      } else {
      }

    });

    $('textarea.commentTextArea').on('keyup',function() {
      if ($('textarea.commentTextArea').val().length == 0){
        $('#commentSubmit').prop('disabled', true);
      }else{
        $('#commentSubmit').prop('disabled', false);
      }
    });
  }

  showHideReply(elementID: String) {
    var target = $('#' + elementID);
    target.find('textarea').val('');
    target.find('textarea').attr('rows', 1);
    $('#replySubmit').prop('disabled', true);

    if (target.css('display') == 'block') {
      target.css('display', 'none');
      $('.commentAddSection').show();
      $('.replyAddSection').hide();
    } else {
      target.css('display', 'block');
      $('.commentAddSection').hide();
    }

    target.find('textarea').focus(function () {
      $(this).attr('rows', 5);
      $('button.replySubmit').show();
    });

    target.find('textarea').blur(function () {
      if ($(this).val().length == 0) {
        $(this).attr('rows', 1);
        target.find('button').hide();
      } else {
        target.find('button').show();
      }

    });

    $('textarea.replyTextArea').on('keyup',function() {
      if ($('textarea.replyTextArea').val().length == 0){
        $('#replySubmit').prop('disabled', true);
      }else{
        $('#replySubmit').prop('disabled', false);
      }
    });
  }

}
