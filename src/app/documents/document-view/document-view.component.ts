import {Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from "rxjs/Rx";
import { Document } from "../document"
import {DocumentsService} from "../documents.service";
import {ActivatedRoute, Router} from "@angular/router";
import { WindRefService } from "../../wind-ref.service";

@Component({
  selector: 'cms-document-view',
  templateUrl: './document-view.component.html',
  styleUrls: ['./document-view.component.css']
})
export class DocumentViewComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private documentIdx: number;
  document: Document;
  nativeWindow: any;

  constructor( private documentsService: DocumentsService,
               private route: ActivatedRoute,
               private router: Router,
               private windRefService: WindRefService) {
    this.nativeWindow = this.windRefService.getNativeWindow();

  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        this.documentIdx = params['idx'];
        this.document = this.documentsService.getDocument(this.documentIdx);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onView() {
    if (!this.document) {
      return;
    }
    let currentUrl = this.document.url;
    this.nativeWindow.open(currentUrl);
  }

  onDelete(){

    this.documentsService.deleteDocument(this.document);
    this.router.navigate(['/documents']);

  }

}




