import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
    selector : 'star-rating-rate',
    templateUrl : './star-rating-rate.component.html',
    styleUrls : ['./star-rating-rate.component.css']
})

export class StarRatingRateComponent { 
    @Input() rate: number;

}