"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var contact_1 = require("./contact");
var ContactsService = (function () {
    function ContactsService() {
        this.contacts = [];
    }
    ContactsService.prototype.getContact = function (idx) {
        return this.contacts;
    };
    ContactsService.prototype.getContacts = function () {
        // individual contacts
        this.contacts[0] = new contact_1.Contact("1", "Rex Barzee", "barzeer@byui.edu", "208-496-3768", "../../images/barzeer.jpg", null);
        this.contacts[1] = new contact_1.Contact("2", "Bradley Armstrong", "armstrongb@byui.edu", "208-496-3766", "../../images/armstrongb.jpg", null);
        this.contacts[2] = new contact_1.Contact("3", "Lee Barney", "barneyl@byui.edu", "208-496-3767", "../../images/barneyl.jpg", null);
        this.contacts[3] = new contact_1.Contact("5", "Kory Godfrey", "godfreyko@byui.edu", "208-496-3770", "../../images/godfreyko.jpg", null);
        this.contacts[4] = new contact_1.Contact("7", "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../images/jacksonk.jpg", null);
        this.contacts[5] = new contact_1.Contact("8", "Craig Lindstrom", "lindstromc@byui.edu", "208-496-3769", "../../images/lindstromc.jpg", null);
        this.contacts[6] = new contact_1.Contact("9", "Michael McLaughlin", "mclaughlinm@byui.edu", "208-496-3772", "../../images/mclaughlinm.jpg", null);
        this.contacts[7] = new contact_1.Contact("11", "Brent Morring", "morringb@byui.edu", "208-496-3778", "../../images/morringb.jpg", null);
        this.contacts[8] = new contact_1.Contact("12", "Mark Olaveson", "olavesonm@byui.edu", "208-496-3773", "../../images/olavesonm.jpg", null);
        this.contacts[9] = new contact_1.Contact("13", "Steven Rigby", "rigbys@byui.edu", "208-496-3774", "../../images/rigbys.jpg", null);
        this.contacts[10] = new contact_1.Contact("15", "Blaine Robertson", "robertsonb@byui.edu", "208-496-3775", "../../images/robertsonb.jpg", null);
        this.contacts[11] = new contact_1.Contact("16", "Randy Somsen", "somsenr@byui.edu", "208-496-3776", "../../images/somsenr.jpg", null);
        this.contacts[12] = new contact_1.Contact("17", "Shane Thompson", "thompsonda@byui.edu", "208-496-3776", "../../images/thompsonda.jpg", null);
        // group Contacts
        this.contacts[13] = new contact_1.Contact("4", "Network/OS team", " ", " ", " ", [this.contacts[1], this.contacts[5], this.contacts[8], this.contacts[9]]);
        this.contacts[14] = new contact_1.Contact("6", "Software Development team", " ", " ", " ", [this.contacts[0], this.contacts[2], this.contacts[4], this.contacts[8]]);
        this.contacts[15] = new contact_1.Contact("10", "Web Development team", " ", " ", " ", [this.contacts[10], this.contacts[11], this.contacts[12]]);
        this.contacts[16] = new contact_1.Contact("14", "Database team", " ", " ", " ", [this.contacts[4], this.contacts[6], this.contacts[7]]);
        this.contacts[17] = new contact_1.Contact("18", "Computer Security team", " ", " ", " ", [this.contacts[3], this.contacts[5], this.contacts[9]]);
        // sort by name
        this.contacts = this.contacts.sort(this.compareNames);
        return this.contacts;
    };
    ContactsService.prototype.compareNames = function (contactA, contactB) {
        if (contactA.name < contactB.name)
            return -1;
        if (contactA.name > contactB.name)
            return 1;
        return 0;
    };
    ContactsService = __decorate([
        core_1.Injectable()
    ], ContactsService);
    return ContactsService;
}());
exports.ContactsService = ContactsService;
