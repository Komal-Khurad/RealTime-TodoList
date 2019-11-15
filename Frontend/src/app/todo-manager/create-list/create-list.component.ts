import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../todo.service';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.css']
})
export class CreateListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  public listTitle: string;

  lists = [];
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private todoService: TodoService
  ) {}
  ngOnInit() {}

  createList(): any {
    const listData = {
      listName: this.listTitle
    }; // end of list data
    console.log(listData);

    this.todoService.createList(listData).subscribe(
      (result) => {
        console.log('List created successfully');
        console.log(result);
        this.toastr.success('List created successfully', 'Success!');
      },
      (err) => {
        console.log('Some error occured');
        console.log(err.errorMessage);
        this.toastr.error('Some error occured', 'Error');
      }
    );
  }
}
