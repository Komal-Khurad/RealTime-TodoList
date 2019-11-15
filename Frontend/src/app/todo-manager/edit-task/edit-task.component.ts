import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './../todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit, OnDestroy {
  public currentTask;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private todoService: TodoService,
    private toastr: ToastrService,
    private location: Location) { }

  ngOnInit() {
    const myTaskId = this._route.snapshot.paramMap.get('taskId');
    console.log(myTaskId);
    this.todoService.getSingleList(myTaskId).subscribe(
      (result) => {
        console.log(result);
        this.currentTask = result['data'];
        console.log('current task is');
        console.log(this.currentTask);
      },
      (err) => {
        console.log('Some error occured!');
        console.log(err.errorMessage);
      }
    );
  }// end of OnInit

  public editTask(): any {
    this.todoService.editTask(this.currentTask.taskId, this.currentTask).subscribe(
      (result) => {
        console.log(result);
        this.toastr.success('Task edited successfully', 'Success!');
      },
      (err) => {
        console.log('Some error occured!');
        console.log(err.errorMessage);
        this.toastr.error('Some error occured', 'Error');
      }
    );
  }

  public goBackToPreviousPage(): any {
    this.location.back();
  }

  ngOnDestroy(): void {
    console.log('edit-task OnDestroy is called');
  }

}
