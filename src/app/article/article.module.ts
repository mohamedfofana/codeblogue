import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleDetailGuard } from '../article-detail/article-detail-guard.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { CommentBoxComponent } from '../widget/comment-box/comment-box.component';
import { DemineurComponent } from '../articles-view/demineur/demineur.component';
import { WindowsComponent } from '../articles-view/windows/windows.component';
import { LinuxComponent } from '../articles-view/linux/linux.component';
import { MyInfosComponent } from '../articles-view/my-infos/my-infos.component';
import { GruntComponent } from '../articles-view/grunt/grunt.component';
import { NodemailerComponent } from '../articles-view/nodemailer/nodemailer.component';
import { CarouselComponent } from '../articles-view/carousel/carousel.component';
import { NodemailerfixitComponent } from '../articles-view/nodemailerfixit/nodemailerfixit.component';
import { ConsoletipComponent } from '../directives/consoletip/consoletip.component';
import { FiguretipComponent } from '../directives/figuretip/figuretip.component';
import { HeaderArticleComponent } from '../widget/header-article/header-article.component';


import { SharedModule } from '../shared/shared.module';
import { ArticleComponent } from './article.component';
import { ItemArticleComponent } from 'app/widget/item-article/item-article.component';
import { FibonacciComponent } from 'app/articles-view/fibonacci/fibonacci.component';
import { GithubGistComponent } from 'app/directives/github-gist-embed/github-gist-embed';

@NgModule({
    declarations: [
        ArticleComponent,
        ArticleDetailComponent,
        CommentBoxComponent,
        DemineurComponent,
        MyInfosComponent,
        WindowsComponent,
        LinuxComponent,
        GruntComponent,
        NodemailerComponent,
        CarouselComponent,
        NodemailerfixitComponent,
        ConsoletipComponent,
        FiguretipComponent,
        HeaderArticleComponent,
        FibonacciComponent,
        GithubGistComponent,
        ItemArticleComponent
    ],
    imports: [
        HttpClientModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        ArticleRoutingModule
    ],
    providers: [ArticleDetailGuard]

})
export class ArticleModule { }
