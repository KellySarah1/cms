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

    return this.documents = Document[idx]; //check this step 4, d.

  }

}






















