import { Component, OnInit } from '@angular/core';
import { Contact } from "./contacts/contact";
@Component({
  selector: 'cms-root',
  templateUrl: './app.component.html',

})
export class AppComponent implements OnInit{
  selectedContact: Contact;

  constructor() {}

  ngOnInit() {

  }
}
