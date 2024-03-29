import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailGuard } from '../article-detail/article-detail-guard.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { ArticleComponent } from './article.component';


const articleRoutes: Routes = [
      { path: 'articles',
              component: ArticleComponent },
      { path: 'article/:url',
              canActivate: [ ArticleDetailGuard ],
              component: ArticleDetailComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(articleRoutes)
  ],
  exports: [ RouterModule ]

})

export class ArticleRoutingModule{}
