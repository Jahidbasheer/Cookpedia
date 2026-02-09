import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing-module';
import { DownloadList } from './download-list/download-list';
import { Dashboard } from './dashboard/dashboard';
import { UsersList } from './users-list/users-list';
import { RequestList } from './request-list/request-list';
import { RecipeList } from './recipe-list/recipe-list';
import { ManageRecipe } from './manage-recipe/manage-recipe';
import { Sidebar } from './sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search-pipe';
import {MatCardModule} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { HighchartsChartComponent } from 'highcharts-angular';



@NgModule({
  declarations: [
    DownloadList,
    Dashboard,
    UsersList,
    RequestList,
    RecipeList,
    ManageRecipe,
    Sidebar
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    SearchPipe,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HighchartsChartComponent
  ]
})
export class AdminModule { }
