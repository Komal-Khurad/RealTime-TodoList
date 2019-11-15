import { Component, OnInit } from '@angular/core';
import { TodoService } from './../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  public currentList;
  constructor(private _route: ActivatedRoute, private router: Router, private todoService: TodoService, private toastr: ToastrService) { }

  ngOnInit() {
    const myListId = this._route.snapshot.paramMap.get('listId');
    console.log(myListId);
    this.todoService.getSingleList(myListId).subscribe(
      (result) => {
        console.log(result);
        this.currentList = result['data'];
        console.log('current list is');
        console.log(this.currentList);
      },
      (err) => {
        console.log('Some error occured!');
        console.log(err.errorMessage);
      }
    );
  }// end of OnInit

  public editList(): any {
    this.todoService.editList(this.currentList.listId, this.currentList).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success('List edited successfully', 'Success!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000);
      },
      (err) => {
        console.log('Some error occured!');
        console.log(err.errorMessage);
        this.toastr.error('Some error occured', 'Error');
      }
    );
  }
}
