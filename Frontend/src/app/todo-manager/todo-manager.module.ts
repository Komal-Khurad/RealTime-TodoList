import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';

import { HomeComponent } from './home/home.component';
import { CreateListComponent } from './create-list/create-list.component';
import { EditListComponent } from './edit-list/edit-list.component';

import { SharedModule } from '../shared/shared.module';

import { DeleteButtonComponent } from './../shared/delete-button/delete-button.component';
import { EditButtonComponent } from './../shared/edit-button/edit-button.component';
import { ModelComponent } from '../shared/model/model.component';
import { TodoService } from './todo.service';
import { ViewListComponent } from './view-list/view-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';

@NgModule({
  declarations: [
    HomeComponent,
    CreateListComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    ModelComponent,
    EditListComponent,
    ViewListComponent,
    NotFoundComponent,
    CreateTaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
    FontAwesomeModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent }
    ])
  ],
  providers: [TodoService],
})
export class TodoManagerModule { }
