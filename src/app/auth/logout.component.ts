import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { SessionService } from '../services/session.service'


@Component({
  template: ''
})
export class LogoutComponent implements OnInit {

  errorMessage: string;

  constructor(private _formBuilder: FormBuilder, private _sessionService: SessionService,
              private _router: Router, private _location: Location) { }

  ngOnInit() {
    this._sessionService.setLogged(false);
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserEmail');
    localStorage.removeItem('userLogged');
    this._location.back();
 }

}
