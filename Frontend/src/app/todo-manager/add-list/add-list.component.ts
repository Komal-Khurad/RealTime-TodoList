import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from './../todo.service';

@Component({
  selector: "add-list",
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})
export class AddListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  public listName: any;
  lists = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private todoService: TodoService
  ) {}
  ngOnInit() {}

  public createList: any = () => {
    const data = {
      listName: this.listName
    };
    console.log(data);
    this.todoService.createList(data).subscribe(
      apiResponse => {
        console.log(apiResponse);
        if (apiResponse.status === 200) {
          this.toastr.success('List created successfully!');

          setTimeout(() => {
          }, 2000);
        } else {
          this.toastr.error(apiResponse.message);
        }
      },
      err => {
        this.toastr.error('Some error occured!');
      }
    );
  }

  public getAllLists: any = () => {
    this.todoService.getAllLists().subscribe(
      apiResponse => {
        this.lists = apiResponse;
      },
      err => {
        this.toastr.error('Some error occured!');
      }
    );
  }

  public getListById: any = () => {
    this.todoService.getListById().subscribe(
      apiResponse => {
        this.lists = apiResponse;
      },
      err => {
        this.toastr.error('Some error occured!');
      }
    );
  }

  public editList: any = () => {
    this.router.navigate(['./edit']);
    const data = {
      listName: this.listName
    };
    this.todoService.editList().subscribe(
      apiResponse => {
        this.lists = apiResponse;
      },
      err => {
        this.toastr.error('Some error occured!');
      }
    );
  }
}
