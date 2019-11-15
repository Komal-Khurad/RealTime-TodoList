import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit, OnDestroy {
  public currentTask;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    public todoService: TodoService,
    private toastr: ToastrService,
    private location: Location) {
      console.log('view-task constructor is called');
    }

  ngOnInit() {
    console.log('View task ngOnInit is called');

    // getting list id from the route
    let myTaskId = this._route.snapshot.paramMap.get('taskId');
    console.log(myTaskId);

    // calling the function to get the task with this listId out of lists array
    this.todoService.getSingleTask(myTaskId).subscribe(
      result => {
        console.log(result);
        this.currentTask = result['data'];
      },
      err => {
        console.log('Some error occured');
        console.log(err.errorMessage);
      }
    );
  }// end of OnInit

  public deleteTask(): any {
    this.todoService.deleteTask(this.currentTask.taskId).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success('Task deleted successfully', 'Success!');
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
    console.log('view-task OnDestroy is called');
  }

}
