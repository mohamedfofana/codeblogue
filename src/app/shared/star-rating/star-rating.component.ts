import { Component, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector : 'star-rating',
    templateUrl : './star-rating.component.html',
    styleUrls : ['./star-rating.component.css']
})

export class StarRatingComponent implements OnChanges{
    starwidth : number;
    @Input()  rates : number;
    @Input()  raters : number;
    // Permet de notifier le composant mère de la modification du rating
    @Output() ratingClicked : EventEmitter<string> = new EventEmitter<string>();

    ngOnChanges(): void {
        this.starwidth = this.rates * 160/(this.raters * 5); // 160 = taille max fieldset rating
    }

    onClick(): void {
        this.ratingClicked.emit(`The rating ${this.rates} was clicked`);
    }

}