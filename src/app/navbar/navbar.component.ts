import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SessionService } from '../services/session.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  searchText: String;
  isLoggedIn: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _sessionService: SessionService, private _router: Router) { 
    this._sessionService.userLogged$.subscribe( isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
        console.log(this.isLoggedIn); 
      });
  }

  ngOnInit() {
    this.searchForm = this._formBuilder.group({
      searchText: ['', Validators.required]
    });

    if ( localStorage.getItem('userLogged') == 'true'){
        if (!this.isLoggedIn){
          console.log('here');
          this._sessionService.setLogged(true);
          let currentUser = JSON.parse(localStorage.getItem('currentUser'));
          console.log(currentUser);
          this._sessionService.setUser(currentUser);
        }
    }else{
        //this._sessionService.setLogged(false);
    }
  }

  onSubmit(): void {
    this.searchText = this.searchForm.controls.searchText.value;
    if(this.searchText.length > 0){
      this._router.navigate(['/resultSearch', {q: this.searchText}]);
    }
  }

}
