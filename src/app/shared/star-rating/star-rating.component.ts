import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';

import { IArticle } from '../../services/models/article';

@Component({
    selector : 'star-rating',
    templateUrl : './star-rating.component.html',
    styleUrls : ['./star-rating.component.css']
})

export class StarRatingComponent implements OnChanges, OnInit {
    starwidth : number;
    @Input()  rates : number;
    @Input()  raters : number;
    @Input() article: IArticle;

    // Permet de notifier le composant mère de la modification du rating
    @Output() ratingClicked : EventEmitter<number> = new EventEmitter<number>();
    //inpustName:string;
    ngOnInit() {
      //this.inpustName = this.itemId + '_rating';
    }

    ngOnChanges(): void {
        //this.starwidth = this.rates * 160/(this.raters * 5); // 160 = taille max fieldset rating
    }

    onClick(item: number): void {
        this.ratingClicked.emit(item);
    }

}