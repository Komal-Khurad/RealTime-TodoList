import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';

import { AddTaskComponent } from './add-task/add-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { HomeComponent } from './home/home.component';
import { AddListComponent } from './add-list/add-list.component';
import { SharedModule } from '../shared/shared.module';
import { ViewListComponent } from './view-list/view-list.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { DeleteListComponent } from './delete-list/delete-list.component';
import { DeleteTaskComponent } from './delete-task/delete-task.component';

import { DeleteButtonComponent } from './../shared/delete-button/delete-button.component';
import { EditButtonComponent } from './../shared/edit-button/edit-button.component';
import { ModelComponent } from '../shared/model/model.component';

@NgModule({
  declarations: [
    AddTaskComponent,
    EditTaskComponent,
    ViewTaskComponent,
    DeleteTaskComponent,
    HomeComponent,
    AddListComponent,
    ViewListComponent,
    EditListComponent,
    DeleteListComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    ModelComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    DataTablesModule,
    FontAwesomeModule,
    RouterModule.forChild([
      { path: 'home', component: HomeComponent },
      { path: 'model', component: ModelComponent }
    ])
  ]
})
export class TodoManagerModule { }
