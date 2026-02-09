import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { DownloadList } from './download-list/download-list';
import { RecipeList } from './recipe-list/recipe-list';
import { UsersList } from './users-list/users-list';
import { RequestList } from './request-list/request-list';
import { ManageRecipe } from './manage-recipe/manage-recipe';

const routes: Routes = [
  {
    path:"",component:Dashboard,title:"Admin Dashboard"
  },
  {
    path:"download-list",component:DownloadList,title:"Download List"
  },
  {
    path:"recipe-list",component:RecipeList,title:"Recipe List"
  },
  {
    path:"user-list",component:UsersList,title:"Users List"
  },
  {
    path:"request-list",component:RequestList,title:"Request List"
  },
  {
    path:"recipe/add",component:ManageRecipe,title:"Add Recipe Page"
  },
  {
    path:"recipe/:id/edit",component:ManageRecipe,title:"Edit Recipe Page"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
