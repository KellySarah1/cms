import { Injectable } from '@angular/core';
import { Message } from './message';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable()
export class MessagesService {

  messages: Message[] = [];
  constructor() { }

  getMessages(){ //check this

    return this.messages = MOCKMESSAGES; //check this from step 4, c. in Create the message class.. messageService:MessagesService
  }

  getMessage(idx: number){

    return this.messages = Message[idx]; //check this step 4, d.

  }


}


