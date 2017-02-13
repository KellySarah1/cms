
export class Document{
  constructor(public documentId: string, public name: string, public description: string, public url: string, public children: Document[]) { //be sure to change
  }
}
