import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessagesService } from '../messages.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: Message[] = [];
  subscription: Subscription;
  constructor(private messagesService: MessagesService) {
    this.subscription = this.messagesService.getMessagesEventEmitter.subscribe(
      (messages: Message[])  => this.messages = messages
    );

  }

  ngOnInit() {
    this.messagesService.getMessages()
      .subscribe(
        (messages: Message[])  => this.messages = messages
      );
  }

}



