import {Injectable, EventEmitter} from '@angular/core';
import {Contact} from "./contact";
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class ContactsService {

  contacts: Contact[] = [];
  currentContact: Contact;
  getContactsEventEmitter = new EventEmitter<Contact[]>();


  constructor(private http: Http) {
    //  this.initContacts();
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
    this.contacts = this.contacts.sort(this.compareNames);

    contact.contactId = "";
    const body = JSON.stringify(contact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/contacts', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const contact = new Contact(result.obj.contactId, result.obj.name, result.obj.email, result.obj.phone, result.obj.imageUrl, result.obj.group);
        this.contacts.push(contact);
        return contact;
      })
      .catch((error: Response) => Observable.throw(error.json()));

    //  this.storeContacts();
  }

  updateContact(oldContact: Contact, newContact: Contact) {
    if (!oldContact || !newContact) {
      return;
    }

    const body = JSON.stringify(oldContact);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/contacts/' + oldContact.contactId, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));


    // this.contacts[this.contacts.indexOf(oldContact)] = newContact;
    // this.contacts = this.contacts.sort(this.compareNames);
    // this.storeContacts();
  }

  deleteContact(contact: Contact) {
    if (!contact === null) {
      return;
    }
    this.contacts.splice(this.contacts.indexOf(contact), 1);
    return this.http.delete('http://localhost:3000/contacts/' + contact.contactId)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));

  }


  //  if (!contact) {
  //    return;
  //  }
  //
  //  const pos = this.contacts.indexOf(contact);
  //  if (pos < 0) {
  //    return;
  //  }
  //
  //  this.contacts.splice(pos, 1);
  //  this.contacts = this.contacts.sort(this.compareNames);
  // // this.storeContacts()


  // initContacts() {
  //   return this.http.get('https://kellysarahcms.firebaseio.com/contacts.json')
  //     .map((response: Response) => response.json())
  //     .subscribe(
  //       (data: Contact[]) => {
  //         this.contacts = data;
  //         this.currentContact = this.getContactById("7");
  //         this.contacts = this.contacts.sort(this.compareNames);
  //         this.getContactsEventEmitter.emit(this.contacts);
  //       }
  //     )
  // }

  // storeContacts() {
  //   const body = JSON.stringify(this.contacts);
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //
  //   return this.http.put('https://kellysarahcms.firebaseio.com/contacts.json', body, {headers: headers}).toPromise();
  // }

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
    //return this.contacts;
    return this.http.get('http://localhost:3000/contacts')
      .map((response: Response) => {
        const contacts: Contact[] = response.json().obj;
        let transformedContacts: Contact[] = [];
        for (let contact of contacts) {
          transformedContacts.push(new Contact(contact.contactId, contact.name, contact.email, contact.phone, contact.imageUrl, contact.group));

                }
        this.contacts = transformedContacts;
        return transformedContacts;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  compareNames(contactA: Contact, contactB: Contact) {

    if (contactA.name < contactB.name)
      return -1;
    if (contactA.name > contactB.name)
      return 1;
    return 0;

  }
}


