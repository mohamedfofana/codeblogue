import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarRatingComponent } from './star-rating/star-rating.component';
import { StarRatingRateComponent } from './star-rating/star-rating-rate.component';

import { ArticleFilterPipe } from './pipes/articleFilter';
import { ReplyFilterPipe } from './pipes/replyFilter';
import { DateFilterPipe } from './pipes/dateFilter';
import { DateTimeFilterPipe } from './pipes/dateTimeFilter';

@NgModule({
    declarations: [ StarRatingComponent, StarRatingRateComponent, ArticleFilterPipe, ReplyFilterPipe, DateFilterPipe, DateTimeFilterPipe ],
    imports: [ CommonModule, FormsModule ],
    exports: [
        CommonModule,
        FormsModule,
        StarRatingComponent,
        StarRatingRateComponent, 
        ArticleFilterPipe,
        ReplyFilterPipe, 
        DateFilterPipe, 
        DateTimeFilterPipe
    ]
})
export class SharedModule { }