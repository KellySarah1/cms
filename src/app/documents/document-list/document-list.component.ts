import { Component, OnInit } from '@angular/core';
import {DocumentsService} from "../documents.service";
import {Document} from '../document'
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  documents: Document[] = [];
  subscription: Subscription;

  constructor(private documentsService: DocumentsService) {
    this.subscription = this.documentsService.getDocumentsEventEmitter.subscribe(
      ( documents: Document[]) => this.documents = documents
    );
  }

  ngOnInit() {
    this.documentsService.getDocuments()
      .subscribe(
        (documents: Document[]) => this.documents = documents
      );
  }

}



