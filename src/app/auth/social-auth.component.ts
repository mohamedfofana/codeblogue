import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service'
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  template: ''
})
export class SocialAuthComponent implements OnInit {

  errorMessage: string;
  group: string;

  constructor(private _authService: AuthService, private _router: Router,
              private _location: Location, private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params: Params) => {
        this.group = params['group'];
        if(this.group.startsWith('success')){
          let username = this.group.substring(7)
          this._authService.logUser(username);
          this._router.navigate(['home']);
        }
        else{
          this._authService.registerSocialMedia(this.group);    
        }
      });;
  }



}
