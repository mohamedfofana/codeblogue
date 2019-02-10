import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent  implements OnInit{
  copyRights: string = ""; 
  ngOnInit() {
    var currentYear = new Date().getUTCFullYear();
    this.copyRights = "Copyright © "+currentYear+" All rights reserved.";
  }

}