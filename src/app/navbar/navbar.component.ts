import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  searchForm: FormGroup;
  searchText: String;

  constructor(private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {
    this.searchForm = this._formBuilder.group({
      searchText: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.searchText = this.searchForm.controls.searchText.value;
    if(this.searchText.length > 0){
      this._router.navigate(['/resultSearch', {q: this.searchText}]);
    }
  }

}
