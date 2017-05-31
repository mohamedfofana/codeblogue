import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable()
export class ArticleDetailGuard implements CanActivate {

    constructor(private _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        let url = route.url[1].path;
        if (!(url)) {
            alert('Invalid article Id' + url);
            this._router.navigate(['/articles']);
            return false;
        };
        return true;
    }
}
