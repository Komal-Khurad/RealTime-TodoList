import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private url = 'https://localhost:3000';

  constructor(public http: HttpClient, private cookie: CookieService) {}

  public createList(data): Observable <any> {
    const params = new HttpParams ()
      .set('listName', data.listName);

    this.http.post(`${this.url}/api/v1/todo/list/create`, params).subscribe(
      (apiResponse) => {
        
      },
      (err) => {

      });
  }

  public getAllLists(): Observable <any> {
    return this.http.get(`${this.url}/api/v1/todo/list/view/all`);
  }

  public getListById(): Observable <any> {
    return this.http.get(`${this.url}/api/v1/todo/list/:listId/view/details`);
  }

  public editList(): Observable <any> {
    return this.http.get(`${this.url}/api/v1/todo/list/:listId/view/details`);
  }
}
