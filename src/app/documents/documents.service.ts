import {Injectable, EventEmitter} from '@angular/core';
import {Document} from './document';
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class DocumentsService {

  //currentDocumentObj: Document;
  currentDocumentId: string;
  documents: Document[] = [];
  getDocumentsEventEmitter = new EventEmitter<Document[]>();


  constructor(private http: Http) {
//    this.initDocuments();
     this.currentDocumentId = '1';
  }

  getDocuments() { //check this

   // return this.documents;
    return this.http.get('http://localhost:3000/documents')
      .map((response: Response) => {
        const documents: Document[] = response.json().obj;
        let transformedDocuments: Document[] = [];
        for (let document of documents) {
          transformedDocuments.push(new Document(document.documentId, document.name, document.description, document.url));
        }
        this.documents = transformedDocuments;
        return transformedDocuments;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }


  getDocument(idx: number) {
    return this.documents[idx];
  }

  addDocument(document: Document) {
  //  this.documents.push(document);
 //   this.storeDocuments();

    if (!document){
      return;
    }
    document.documentId = "";
    const body = JSON.stringify(document);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/documents', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const document = new Document(result.obj.documentId, result.obj.name, result.obj.description, result.obj.url);
        this.documents.push(document);
        return document;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }



  deleteDocument(document: Document) {{
    if (!document === null) {
      return;}
      this.documents.splice(this.documents.indexOf(document), 1);
      return this.http.delete('http://localhost:3000/documents/' + document.documentId)
        .map((response: Response) => response.json())
        .catch((error: Response) => Observable.throw(error.json()));

    }

    // const pos = this.documents.indexOf(document);
    // if (pos < 0){
    //   return;
    }
  //   //this.documents.splice(this.documents.indexOf(document), 1);
  //   this.documents.splice(pos, 1);
  // //  this.storeDocuments();
  // }

  updateDocument(document: Document) {
   // this.documents[this.documents.indexOf(oldDoc)] = newDoc;
  //  this.storeDocuments();
    if (!document ===  null){
      return;
    }
    const body = JSON.stringify(document);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/documents/' + document.documentId, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));













  }

  // initDocuments() {
  //   return this.http.get('https://kellysarahcms.firebaseio.com/documents.json')
  //     .map((response: Response) => response.json())
  //     .subscribe(
  //       (data: Document[]) => {
  //         this.documents = data;
  //         this.getDocumentsEventEmitter.emit(this.documents);
  //       }
  //     )
  // }

  // storeDocuments(){
  //   const body = JSON.stringify(this.documents);
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //
  //   return this.http.put('https://kellysarahcms.firebaseio.com/documents.json', body, {headers: headers}).toPromise();
  // }

}






















