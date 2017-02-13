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
"use strict";
var Contact = (function () {
    function Contact(contactId, name, email, phone, imageUrl, group) {
        // constructor(id: string, name: string, etc.
        /*
         Add this with the constructor id: string above:
         this.id = id;
         this.name = name;
         this.email = email;
         this.imageUrl = imageurl;
         this.group = group;
         */
        this.contactId = contactId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.imageUrl = imageUrl;
        this.group = group;
    }
    return Contact;
}());
exports.Contact = Contact;
