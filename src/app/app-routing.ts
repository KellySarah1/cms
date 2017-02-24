import { Routes, RouterModule } from "@angular/router";

import { DocumentsComponent } from "./documents/documents.component";
import { MessagesComponent } from "./messages/messages.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { MESSAGE_ROUTES } from "./messages/message-routes";
import { DOCUMENT_ROUTES } from "./documents/document-routes";
import { CONTACT_ROUTES } from "./contacts/contact-routes"

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' }, //default route?
  { path: 'documents', component: DocumentsComponent, children: DOCUMENT_ROUTES },
  { path: 'messages', component: MessagesComponent, children: MESSAGE_ROUTES },
  { path: 'contacts', component: ContactsComponent, children: CONTACT_ROUTES }
];

export const routing = RouterModule.forRoot(APP_ROUTES);

/**


 import { Routes, RouterModule } from "@angular/router";

 import { RecipesComponent } from "./recipes/recipes.component";
 import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
 import { RECIPE_ROUTES } from "./recipes/recipes.routes";

 const APP_ROUTES: Routes = [
 { path: '', redirectTo: '/recipes', pathMatch: 'full' },
 { path: 'recipes', component: RecipesComponent, children: RECIPE_ROUTES },
 { path: 'shopping-list', component: ShoppingListComponent }
 ];

 export const routing = RouterModule.forRoot(APP_ROUTES);

 **/
