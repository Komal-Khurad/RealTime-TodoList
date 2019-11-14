import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.css'],
  providers: [Location]
})
export class ViewListComponent implements OnInit, OnDestroy {
  public currentList;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    public todoService: TodoService,
    private toastr: ToastrService,
    private location: Location
  ) {
    console.log('view-list constructor is called');
  }

  ngOnInit() {
    console.log('View list ngOnInit is called');

    // getting list id from the route
    let myListId = this._route.snapshot.paramMap.get('listId');
    console.log(myListId);

    // calling the function to get the list with this listId out of lists array
    this.todoService.getSingleList(myListId).subscribe(
      result => {
        console.log(result);
        this.currentList = result['data'];
      },
      err => {
        console.log('Some error occured');
        console.log(err.errorMessage);
      }
    );
  }

  public deleteList(): any {
    this.todoService.deleteList(this.currentList.listId).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success('List deleted successfully', 'Success!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      (err) => {
        console.log('Some error occured');
        console.log(err.errorMessage);
        this.toastr.error('Some error occured', 'Error');
      }
    );
  }

  public goBackToPreviousPage(): any {
    this.location.back();
  }

  ngOnDestroy(): void {
    console.log('view-list OnDestroy is called');
  }
}
