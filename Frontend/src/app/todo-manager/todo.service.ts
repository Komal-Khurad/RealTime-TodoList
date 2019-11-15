import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public allList: [];
  public currentList;
  private authToken;
  public baseUrl = 'hhttps://localhost:3000';

  constructor(private http: HttpClient, private cookie: CookieService) { }

  // method to get a all lists
  public getAllLists(): any {
    const apiResponse = this.http.get(
      this.baseUrl + '/api/v1/todo/list/view/all' + '?authToken=' + this.authToken
    );
    console.log(apiResponse);
    return apiResponse;
  }// end of getting all lists

  // method to get a particular list
  public getSingleList(currentListId): any {
    const apiResponse = this.http.get(
      this.baseUrl + '/api/v1/todo/list/' + currentListId + '/view/details' + '?authToken=' + this.authToken
    );
    return apiResponse;
  } // end of get list information function

  public createList(listData): any {
    const apiResponse = this.http.post(this.baseUrl + '/api/v1/todo/list/create' + '?authToken=' + this.authToken, listData);
    return apiResponse;
  }

  public deleteList(currentListId): any {
    const data = {};
    const apiResponse = this.http.post(
      this.baseUrl + '/api/v1/todo/list/' + currentListId + '/delete' + '?authToken=' + this.authToken,
      data
    );
    return apiResponse;
  }

  public editList(currentListId, listData): any {
    const myResponse = this.http.put(
      this.baseUrl + '/api/v1/todo/list/' + currentListId + '/edit' + '?authToken=' + this.authToken,
      listData
    );
    return myResponse;
  }

  // method to get a all tasks
  public getAllTasks(): any {
    const apiResponse = this.http.get(
      this.baseUrl + '/api/v1/todo/list/task/view/all' + '?authToken=' + this.authToken
    );
    console.log(apiResponse);
    return apiResponse;
  }// end of getting all tasks

  // method to get a particular task
  public getSingleTask(currentTaskId): any {
    const apiResponse = this.http.get(
      this.baseUrl + '/api/v1/todo/list/task/' + currentTaskId + '/view/details' + '?authToken=' + this.authToken
    );
    return apiResponse;
  } // end of get task information function

   // method to create task
  public createTask(taskData): any {
    const apiResponse = this.http.post(this.baseUrl + '/api/v1/todo/list/task/create' + '?authToken=' + this.authToken, taskData);
    return apiResponse;
  }// end of create task

  // method to delete task
  public deleteTask(currentTaskId): any {
    const data = {};
    const apiResponse = this.http.post(
      this.baseUrl + '/api/v1/todo/list/task/' + currentTaskId + '/delete' + '?authToken=' + this.authToken,
      data
    );
    return apiResponse;
  }// end of delete task

  public editTask(currentTaskId, taskData): any {
    const myResponse = this.http.put(
      this.baseUrl + '/api/v1/todo/list/task/' + currentTaskId + '/edit' + '?authToken=' + this.authToken,
      taskData
    );
    return myResponse;
  }

}

