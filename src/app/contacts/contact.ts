// import { Injectable } from '@angular/core'
// @INjectable()
/*

id: string;
name: string;
email: string;
phone: string;
imageUrl: string;
group: Contact[];
}




 */

export class Contact {
  constructor(public contactId: string, public name: string, public email: string, public phone: string, public imageUrl: string, public group: string) {

    // constructor(id: string, name: string, etc.
    /*
    Add this with the constructor id: string above:
    this.id = id;
    this.name = name;
    this.email = email;
    this.imageUrl = imageurl;
    this.group = group;

     */

  }
}
