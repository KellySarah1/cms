import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {Contact} from "../contact";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
})

export class ContactListComponent implements OnInit {

  @Output() selectedContact = new EventEmitter<Contact>();
  contact: Contact = null;
  contacts: Contact[] = [];
  term: string = "";

  constructor(private contactsService:ContactsService) {

    //double check this on step 3 on instruction:Create contact service
  }

  ngOnInit() {
    this.contacts =this.contactsService.getContacts();
    this.contactsService.getContactsEventEmitter.subscribe(
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




