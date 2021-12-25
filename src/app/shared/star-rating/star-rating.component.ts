import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
    selector : 'star-rating',
    templateUrl : './star-rating.component.html',
    styleUrls : ['./star-rating.component.css']
})

export class StarRatingComponent {
    starwidth : number;
    @Input()  rate : number;
    // Permet de notifier le composant mère de la modification du rating
    @Output() ratingClicked : EventEmitter<number> = new EventEmitter<number>();

    onClick(item: number): void {
        this.ratingClicked.emit(item);
    }

}
