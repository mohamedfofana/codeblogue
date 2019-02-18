import { Observable } from 'rxjs/Observable';
export abstract class GenericService {
    constructor(){
    }
    public handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json() || 'Server error');
    }
}