import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {DocumentsService} from "../documents.service";
import { Document } from '../document';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit, OnDestroy {

  subscription: Subscription; //route subscription
  oldDocument: Document;  //ref. to old document
  editMode: boolean = false; //in edit mode flag?



  constructor( private documentsService: DocumentsService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {

        if (params.hasOwnProperty('idx')) {
          let documentIndex = +params['idx'];
          this.oldDocument = this.documentsService.getDocument(documentIndex);
          this.editMode = true;
        } else {
          this.editMode = false;
          this.oldDocument = null;
        }

      }
    )

  }

  onSubmit(value){
    let newDocument = new Document(null,
                                  value.name,
                                  value.description,
                                  value.url);
    if (this.editMode) {

      newDocument.documentId = this.oldDocument.documentId;
      this.documentsService.updateDocument( newDocument)
      .subscribe();
    }
    else {
      newDocument.name = value.documentTitle;
      newDocument.description = value.documentDescription;
      newDocument.url = value.documentUrl;
      this.documentsService.addDocument(newDocument)
        .subscribe();
    }

    this.router.navigate(['documents']);

  }

  onCancel(){
    this.router.navigate(['documents']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

