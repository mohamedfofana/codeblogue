import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { SessionService } from '../services/session.service'


@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  errorMessage: string;

  constructor(private _sessionService: SessionService,
              private _location: Location) { }

  ngOnInit() {
    this._sessionService.setLogged(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userLogged');
    this._location.back();
  }



}
