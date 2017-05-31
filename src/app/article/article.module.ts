import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { ArticleComponent } from './article.component';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticleFilterPipe } from './article-filter.pipe';
import { ReplyFilterPipe } from '../pipes/replyFilter';
import { ArticleDetailGuard } from '../article-detail/article-detail-guard.service';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { DemineurComponent } from '../articles-view/demineur/demineur.component';
import { MorpionComponent } from '../articles-view/morpion/morpion.component';
import { WindowsComponent } from '../articles-view/windows/windows.component';
import { LinuxComponent } from '../articles-view/linux/linux.component';
import { SqlComponent } from '../articles-view/sql/sql.component';
import { OracleComponent } from '../articles-view/oracle/oracle.component';
import { GruntComponent } from '../articles-view/grunt/grunt.component';
import { NodemailerComponent } from '../articles-view/nodemailer/nodemailer.component';
import { CarouselComponent } from '../articles-view/carousel/carousel.component';
import { NodemailerfixitComponent } from '../articles-view/nodemailerfixit/nodemailerfixit.component';
import { ConsoletipComponent } from '../articles-view/consoletip/consoletip.component';
import { FiguretipComponent } from '../articles-view/figuretip/figuretip.component';


import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ArticleComponent,
        ArticleDetailComponent,
        CommentBoxComponent,
        DemineurComponent,
        MorpionComponent,
        WindowsComponent,
        LinuxComponent,
        SqlComponent,
        OracleComponent,
        GruntComponent,
        NodemailerComponent,
        CarouselComponent,
        NodemailerfixitComponent,
        ConsoletipComponent,
        FiguretipComponent,
        ArticleFilterPipe,
        ReplyFilterPipe
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