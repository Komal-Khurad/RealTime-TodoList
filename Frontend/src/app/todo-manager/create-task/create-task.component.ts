import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../todo.service';
import { Location } from '@angular/common';

@Component({
  selector: 'create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit, OnDestroy{
  public taskTitle: string;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private todoService: TodoService,
    private location: Location) { }

  ngOnInit() {
  }

  createTask(): any {
    const taskData = {
      taskName: this.taskTitle
    }; // end of list data
    console.log(taskData);

    this.todoService.createTask(taskData).subscribe(
      (result) => {
        console.log('Task created successfully');
        console.log(result);
        this.toastr.success('Task created successfully', 'Success!');
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
    console.log('create-task OnDestroy is called');
  }

}
