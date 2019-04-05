import { Observable } from 'rxjs/Observable';
export abstract class GenericService {
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}
