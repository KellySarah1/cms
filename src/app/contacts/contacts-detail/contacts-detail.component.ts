import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { Contact } from "../contact";
import {ActivatedRoute, Router} from "@angular/router";
import {ContactsService} from "../contacts.service";


@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
})
export class ContactsDetailComponent implements OnInit, OnDestroy {
  @Input() selectedContact: Contact; //a class input variable. it references Contact.

  private subscription: Subscription;
  private contactIdx: number;
  contact: Contact;
  contactGroup: Contact[];


  constructor(private contactsService: ContactsService,
              private route: ActivatedRoute,
              private router: Router,) {

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.contactIdx = params['idx'];
        this.contact = this.contactsService.getContact(this.contactIdx);
       this.contactGroup = params['contact.group'];

       }
    )
  }

  onDelete(){

    this.contactsService.deleteContact(this.contact).subscribe();
    this.router.navigate(['contacts']);
//call save function
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

