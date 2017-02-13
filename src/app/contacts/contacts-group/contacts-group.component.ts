import { Component, OnChanges, Input } from '@angular/core';
import { Contact } from "../contact";

@Component({
  selector: 'cms-contacts-group',
  templateUrl: './contacts-group.component.html',
})
export class ContactsGroupComponent implements OnChanges {
  @Input() selectedContact: Contact;
  contactGroup: Contact[] = [];
  constructor() { }

  ngOnChanges() {
    this.contactGroup = this.selectedContact.group;
  }

}
