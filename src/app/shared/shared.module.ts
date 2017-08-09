import { NgModule }  from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StarRatingComponent } from './star-rating/star-rating.component';
import { StarRatingRateComponent } from './star-rating/star-rating-rate.component';

@NgModule({
    declarations: [ StarRatingComponent, StarRatingRateComponent ],
    imports: [ CommonModule, FormsModule ],
    exports: [
        CommonModule,
        FormsModule,
        StarRatingComponent,
        StarRatingRateComponent
    ]
})
export class SharedModule { }