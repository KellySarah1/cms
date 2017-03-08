import { Injectable } from '@angular/core';
import { Document } from './document';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable()
export class DocumentsService {

  documents: Document[] = [];
  constructor() { }

  getDocuments(){ //check this

    return this.documents = MOCKDOCUMENTS; //check this from step 4, c. in Create the message class.. messageService:MessagesService
  }

  getDocument(idx: number){
    return this.documents[idx]; //check this step 4, d.
  }

  deleteDocument(document: Document) {
    this.documents.splice(this.documents.indexOf(document), 1)
  }

  addDocument(document: Document){
    this.documents.push(document);
  }

  updateDocument(oldDoc: Document, newDoc: Document){

    this.documents[this.documents.indexOf(oldDoc)] = newDoc;

  }

}






















