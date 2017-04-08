import {Injectable, EventEmitter} from '@angular/core';
import {Message} from './message';
import 'rxjs/Rx';
import {Http, Response, Headers} from "@angular/http";
import { Observable } from "rxjs";

@Injectable()
export class MessagesService {


  currentMessageId: string;
  messages: Message[] = [];
  getMessagesEventEmitter = new EventEmitter<Message[]>();


  constructor(private http: Http) {
  //  this.initMessages();
    this.currentMessageId = '1';
  }

  getMessages() { //check this
   // return this.messages;
    return this.http.get('http://localhost:3000/messages')
      .map((response: Response) => {
        const messages = response.json().obj;
        let transformedMessages: Message[] = [];
        for (let message of messages) {
          transformedMessages.push(new Message(message.messageId, message.sender, message.subject, message.text ));
        }
        this.messages = transformedMessages;
        return transformedMessages;
      })

      .catch((error: Response) => Observable.throw(error.json()));

  }


  getMessage(idx: number) {
    return this.messages[idx];
  }


  addMessage(message: Message) {
    this.messages.push(message);
  //  this.storeMessages();
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/messages', body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const message = new Message(result.obj.messageId, result.obj.sender, result.obj.subject, result.obj.text );
        this.messages.push(message);

      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

  updateMessage(message: Message) {
    const body = JSON.stringify(message);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.patch('http://localhost:3000/messages/' + message.messageId, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteMessage(message: Message) {

    this.messages.splice(this.messages.indexOf(message), 1);
    return this.http.delete('http://localhost:3000/messages/' + message.messageId)
      .map((response: Response) => response.json())
      .catch((error: Response) => Observable.throw(error.json()));
  }



  // initMessages() {
  //   return this.http.get('https://kellysarahcms.firebaseio.com/messages.json')
  //     .map((response: Response) => response.json())
  //     .subscribe(
  //       (data: Message[]) => {
  //         this.messages = data;
  //         this.getMessagesEventEmitter.emit(this.messages);
  //       }
  //     )
  // }

  // storeMessages() {
  //   const body = JSON.stringify(this.messages);
  //   const headers = new Headers({
  //     'Content-Type': 'application/json'
  //   });
  //
  //   return this.http.put('https://kellysarahcms.firebaseio.com/messages.json', body, {headers: headers}).toPromise();
  // }


}


