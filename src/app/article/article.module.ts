import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleDetailGuard } from '../article-detail/article-detail-guard.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { CommentBoxComponent } from '../widget/comment-box/comment-box.component';
import { DemineurComponent } from '../articles-view/demineur/demineur.component';
import { MorpionComponent } from '../articles-view/morpion/morpion.component';
import { WindowsComponent } from '../articles-view/windows/windows.component';
import { LinuxComponent } from '../articles-view/linux/linux.component';
import { MyInfosComponent } from '../articles-view/my-infos/my-infos.component';
import { OracleComponent } from '../articles-view/oracle/oracle.component';
import { GruntComponent } from '../articles-view/grunt/grunt.component';
import { NodemailerComponent } from '../articles-view/nodemailer/nodemailer.component';
import { CarouselComponent } from '../articles-view/carousel/carousel.component';
import { NodemailerfixitComponent } from '../articles-view/nodemailerfixit/nodemailerfixit.component';
import { ConsoletipComponent } from '../articles-view/consoletip/consoletip.component';
import { FiguretipComponent } from '../articles-view/figuretip/figuretip.component';
import { HeaderArticleComponent } from '../widget/header-article/header-article.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ArticleDetailComponent,
        CommentBoxComponent,
        DemineurComponent,
        MyInfosComponent,
        MorpionComponent,
        WindowsComponent,
        LinuxComponent,
        OracleComponent,
        GruntComponent,
        NodemailerComponent,
        CarouselComponent,
        NodemailerfixitComponent,
        ConsoletipComponent,
        FiguretipComponent,
        HeaderArticleComponent
    ],
    imports: [
        HttpModule,
        RouterModule,
        SharedModule,
        ReactiveFormsModule,
        ArticleRoutingModule
    ],
    providers: [ArticleDetailGuard]

})
export class ArticleModule { }