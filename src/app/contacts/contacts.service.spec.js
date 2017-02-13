/* tslint:disable:no-unused-variable */
"use strict";
var testing_1 = require('@angular/core/testing');
var contacts_service_1 = require('./contacts.service');
describe('ContactsService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [contacts_service_1.ContactsService]
        });
    });
    it('should ...', testing_1.inject([contacts_service_1.ContactsService], function (service) {
        expect(service).toBeTruthy();
    }));
});
