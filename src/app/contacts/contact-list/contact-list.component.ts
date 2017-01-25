import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Contact} from "../contact";
import {ContactItemComponent} from './contact-item.component';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  @Output() selectedContact = new EventEmitter<Contact>();
  contact = new Contact('Puppy', 'Puppy', 'PuppyLove@puppies.com', '1-800-PuppyLove', 'http://cdn2-www.dogtime.com/assets/uploads/gallery/30-impossibly-cute-puppies/impossibly-cute-puppy-8.jpg', 'puppies');

  constructor() { }

  ngOnInit() {
  }

  onSelected(contact: Contact){
  this.selectedContact.emit(contact);
  }
}
