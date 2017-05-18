import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleFilterPipe } from './article-filter.pipe';
import { ArticleDetailGuard } from '../article-detail/article-detail-guard.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ArticleComponent,
        ArticleDetailComponent,
        ArticleFilterPipe
    ],
    imports: [
        HttpModule,
        RouterModule,
        SharedModule,
        ArticleRoutingModule
    ],
    providers: [ArticleDetailGuard]

})
export class ArticleModule { }