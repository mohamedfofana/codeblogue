import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { RightMenuComponent } from './right-menu/right-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ArticleModule } from './article/article.module';

import { ArticleService } from './services/article.service';
import { ContactService } from './services/contact.service';
import { ValidationService } from './services/validation.service';
import { ResultSearchComponent } from './search/result-search/result-search.component';
import { ResultItemComponent } from './search/result-item/result-item.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ContactComponent,
    FooterComponent,
    RightMenuComponent,
    ResultSearchComponent,
    ResultItemComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule,
    ArticleModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ArticleService, ContactService, ValidationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
