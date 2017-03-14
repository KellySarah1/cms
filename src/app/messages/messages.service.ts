import {Injectable, EventEmitter} from '@angular/core';
import {Message} from './message';
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";

@Injectable()
export class MessagesService {


  currentMessageId: string;
  messages: Message[] = [];
  getMessagesEventEmitter = new EventEmitter<Message[]>();


  constructor(private http: Http) {
    this.initMessages();
    this.currentMessageId = '1';
  }

  getMessages() { //check this
    return this.messages;
  }

  getMessage(idx: number) {
    return this.messages[idx];
  }


  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }


  initMessages() {
    return this.http.get('https://kellysarahcms.firebaseio.com/messages.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Message[]) => {
          this.messages = data;
          this.getMessagesEventEmitter.emit(this.messages);
        }
      )
  }

  storeMessages() {
    const body = JSON.stringify(this.messages);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.put('https://kellysarahcms.firebaseio.com/messages.json', body, {headers: headers}).toPromise();
  }


}

