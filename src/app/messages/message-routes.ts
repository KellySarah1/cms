import { Routes } from "@angular/router";
import { MessageNewComponent } from "./message-new/message-new.component"

export const MESSAGE_ROUTES: Routes = [
  { path: 'new', component: MessageNewComponent},
];


/**
 *
 *
 * import { Routes } from "@angular/router";

 import { RecipeStartComponent } from "./recipe-start.component";
 import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
 import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";

 export const RECIPE_ROUTES: Routes = [
 { path: '', component: RecipeStartComponent },
 { path: 'new', component: RecipeEditComponent },
 { path: ':id', component: RecipeDetailComponent },
 { path: ':id/edit', component: RecipeEditComponent }
 ];
 *
 *
 *
 */
