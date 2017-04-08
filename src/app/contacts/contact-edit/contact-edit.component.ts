import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Contact} from "../contact";
import {Router, ActivatedRoute} from "@angular/router";
import {ContactsService} from "../contacts.service";

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private editMode: boolean = false;
  private hasGroup: boolean = false;
  private contactIdx: number;
  private contact: Contact;
  private groupContacts: Contact[] = [];
  private invalidGroupContact: boolean = true;

  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute,
              private router: Router) {
  }


  ngOnInit() {

    this.editMode = false;
    this.hasGroup = false;
    this.invalidGroupContact = false;

    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('idx')) {
          this.contactIdx = +params['idx'];
          this.contact = this.contactsService.getContact(this.contactIdx);
          this.editMode = true;
          if (0 < this.groupContacts.length) {   //check to see if this works
            this.hasGroup = true;
          }
          this.groupContacts = this.groupContacts.slice();
        }
      }
    )
  }

  onSubmit(value) {
    let newContact = new Contact(null,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      value.groupContacts); //check this to see p 17

    if (this.editMode) {
      newContact.contactId = this.contact.contactId;
      this.contactsService.updateContact(this.contact, newContact).subscribe();
    }
    else {
      this.contactsService.addContact(newContact).subscribe();
    }

    this.router.navigate(['contacts']);

  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }

    if (newContact.contactId === this.contact.contactId) {
      return true;
    }

    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.contactId === this.groupContacts[i].contactId){
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    let selectedContact: Contact = $event.dragData;
    this.invalidGroupContact = this.isInvalidContact(selectedContact);
    if (this.invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
    this.invalidGroupContact = false;
  }

  onRemoveItem(idx: number) {
    if (idx < 0 || idx >= this.groupContacts.length)
      return;

    this.groupContacts.splice(idx, 1);
    this.invalidGroupContact = false;
  }

  onCancel() {
    this.router.navigate(['contacts']);
  }




  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

