import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';

import { IContact } from '../services/models/contact';

import { ContactService } from '../services/contact.service'
import { ValidationService } from '../services/validation.service'

@Component({
  templateUrl: './contact.component.html'
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  contact: IContact;
  errorMessage: string;
  errorContact: string;
  pendingContact: boolean = false;
  successContact: string;

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _contactService: ContactService) { }

  ngOnInit() {
    this.contactForm = this._formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(70)]],
      objet: ['', [Validators.required, Validators.maxLength(50)]],
      contenu: ['', [Validators.required, Validators.maxLength(1000)]]
    });
  }

  onSubmit(): void {
    this.errorContact ="";
    this.successContact ="";
    this.pendingContact=true;
    if (!ValidationService.emailValidator(this.contactForm.controls.email.value)) {
      this.errorContact = "Email invalide.";
      this.pendingContact=false;
      return
    }
    this.contact = this.contactForm.value;
    if (this.contactForm.valid) {
      this._contactService.sendMail(this.contact).subscribe(response => {
        if (response == 'error') {
          this.errorContact = "Un problème est survenu lors de l'envoie de l'email.";
        } else {
          this.successContact = "Email envoyé avec succès.";
        }
        this.pendingContact=false;
      }, error => { this.errorMessage = <any>error; console.log(this.errorMessage); this.pendingContact=false;});
    }
  }
}
