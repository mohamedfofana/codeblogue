import {Injectable}      from '@angular/core'
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { IUser } from './models/user';

@Injectable()
export class SessionService {
  // Observable source
  private _userLogged = new BehaviorSubject<boolean>(false);
  private _currentUser = new BehaviorSubject<IUser>({email:'', username: '', password: ''});

  // Observable stream
  userLogged$ = this._userLogged.asObservable();
  currentUser$ = this._currentUser.asObservable();

  // service command
  setLogged(value: boolean) {
    this._userLogged.next(value);
  }
  
  setUser(user: IUser) {
    this._currentUser.next(user);
  }
  
}