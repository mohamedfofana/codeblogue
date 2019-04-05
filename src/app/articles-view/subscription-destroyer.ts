import { Subject } from "rxjs";
import { OnDestroy } from '@angular/core';

export abstract class SubscriptionDestroyer implements OnDestroy {
  protected unsubscribe$ = new Subject();
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
