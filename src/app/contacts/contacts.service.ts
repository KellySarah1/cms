import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from "./contact";
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";

@Injectable()
export class ContactsService {

  contacts: Contact[] = [];
  currentContact: Contact;
  getContactsEventEmitter = new EventEmitter<Contact[]>();


  constructor(private http: Http) {
    this.initContacts();
    //  this.currentContactId = '1';
  }


  //this.contacts = this.initContacts();
  //   this.currentContact = new Contact("18", "Tom McKay", "mcKay@byui.edu", "208-496-2112", "../../images/tomMcKay.png", null);
  // }

  /*

   constructor() {
   //this.contacts = this.initContacts();
   this.currentContact = new Contact("18", "Tom McKay", "mcKay@byui.edu", "208-496-2112", "../../images/tomMcKay.png", null);
   }

   */


  getContactById(id: string): Contact {
    return this.contacts.find((contact: Contact) => contact.contactId === id);
  }

  addContact(contact: Contact) {
    if (!contact)
      return;
    this.contacts.push(contact);
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }

  updateContact(oldContact: Contact, newContact: Contact) {
    if (!oldContact || !newContact) {
      return;
    }

    this.contacts[this.contacts.indexOf(oldContact)] = newContact;
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }

    this.contacts.splice(pos, 1);
    this.contacts = this.contacts.sort(this.compareNames);
    this.storeContacts()
  }

  initContacts() {
    return this.http.get('https://kellysarahcms.firebaseio.com/contacts.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Contact[]) => {
          this.contacts = data;
          this.currentContact = this.getContactById("7");
          this.contacts = this.contacts.sort(this.compareNames);
          this.getContactsEventEmitter.emit(this.contacts);
        }
      )
  }

  storeContacts() {
    const body = JSON.stringify(this.contacts);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://kellysarahcms.firebaseio.com/contacts.json', body, {headers: headers}).toPromise();
  }

  getCurrentContact() {
    return this.currentContact;
  }

  getContact(idx: number) {
    return this.contacts[idx];
  }

  getContacts() {
    this.contacts;
    // sort by name
    this.contacts = this.contacts.sort(this.compareNames);
    return this.contacts;
  }

  compareNames(contactA: Contact, contactB: Contact) {

    if (contactA.name < contactB.name)
      return -1;
    if (contactA.name > contactB.name)
      return 1;
    return 0;

  }
}
