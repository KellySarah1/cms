import { Routes } from "@angular/router";
import { DocumentEditComponent } from "./document-edit/document-edit.component"
import { DocumentViewComponent } from "./document-view/document-view.component"

export const DOCUMENT_ROUTES: Routes = [
  { path: 'new', component: DocumentEditComponent },
  { path: ':idx', component: DocumentViewComponent },
  { path: ':idx/edit', component: DocumentEditComponent }
];



/**
 import { Routes } from "@angular/router";

 import { RecipeStartComponent } from "./recipe-start.component";
 import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
 import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";

 export const RECIPE_ROUTES: Routes = [
 { path: '', component: RecipeStartComponent },
 { path: 'new', component: RecipeEditComponent },
 { path: ':id', component: RecipeDetailComponent },
 { path: ':id/edit', component: RecipeEditComponent }
 ];
 **/
