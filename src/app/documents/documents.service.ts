import {Injectable, EventEmitter} from '@angular/core';
import {Document} from './document';
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";

@Injectable()
export class DocumentsService {

  //currentDocumentObj: Document;
  currentDocumentId: string;
  documents: Document[] = [];
  getDocumentsEventEmitter = new EventEmitter<Document[]>();


  constructor(private http: Http) {
    this.initDocuments();
     this.currentDocumentId = '1';
  }

  getDocuments() { //check this

    return this.documents;
  }



  getDocument(idx: number) {
    return this.documents[idx];
  }

  addDocument(document: Document) {
    this.documents.push(document);
    this.storeDocuments();
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0){
      return;
    }
    //this.documents.splice(this.documents.indexOf(document), 1);
    this.documents.splice(pos, 1);
    this.storeDocuments();
  }

  updateDocument(oldDoc: Document, newDoc: Document) {
    this.documents[this.documents.indexOf(oldDoc)] = newDoc;
    this.storeDocuments();

  }

  initDocuments() {
    return this.http.get('https://kellysarahcms.firebaseio.com/documents.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Document[]) => {
          this.documents = data;
          this.getDocumentsEventEmitter.emit(this.documents);
        }
      )
  }

  storeDocuments(){
    const body = JSON.stringify(this.documents);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://kellysarahcms.firebaseio.com/documents.json', body, {headers: headers}).toPromise();
  }

}






















