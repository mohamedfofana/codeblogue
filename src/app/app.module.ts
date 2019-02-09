import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


import { ReactiveFormsModule } from '@angular/forms';
import { ArticleModule } from './article/article.module';
import { AppConfigModule } from './config/app-config.module';
import { SharedModule } from './shared/shared.module';

import { ArticleService } from './services/article.service';
import { CommentService } from './services/comment.service';
import { ReplyService } from './services/reply.service';
import { ContactService } from './services/contact.service';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';
import { ValidationService } from './services/validation.service';

import { ResultSearchComponent } from './search/result-search/result-search.component';
import { ResultItemComponent } from './search/result-item/result-item.component';
import { LoginComponent } from './auth/login.component';

import { RegisterComponent } from './auth/register.component';
import { LogoutComponent } from './auth/logout.component';
import { SocialAuthComponent } from './auth/social-auth.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { PreviewArticleComponent } from './widget/preview-article/preview-article.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    SocialAuthComponent,
    ContactComponent,
    FooterComponent,
    RightMenuComponent,
    ResultSearchComponent,
    ResultItemComponent,
    PreviewArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    ArticleModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AppConfigModule
  ],
  providers: [ArticleService, AuthService, SessionService, CommentService, ReplyService, ContactService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
