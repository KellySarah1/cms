import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
})

export class ContactListComponent implements OnInit {

  @Output() selectedContact = new EventEmitter<Contact>();
  contact: Contact = null;
  contacts: Contact[] = [];
  term: string = "";
  subscription: Subscription;

  constructor(private contactsService:ContactsService) {
    this.subscription = this.contactsService.getContactsEventEmitter.subscribe(
      (contacts: Contact[]) => this.contacts = contacts
    );
  }

  ngOnInit() {
    this.contactsService.getContacts()
      .subscribe(
      (contacts: Contact[]) => this.contacts = contacts
    );

  }

  onSelected(contact: Contact) {
    this.selectedContact.emit(contact);
  }

  onKeyPress(value: string) {
    this.term = value;
  }


}




