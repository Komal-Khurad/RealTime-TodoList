import { Component, OnInit } from '@angular/core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from './../todo.service';

@Component({
  selector: 'add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
})

export class AddListComponent implements OnInit {
  faPlusCircle = faPlusCircle;
  public listName: any;
  lists: any[];
  constructor(private router: Router, private toastr: ToastrService, private todoService: TodoService) { }
  ngOnInit() {}

  public createList: any = () => {
    if (!this.listName) {
      this.toastr.warning('Enter list name');
    } else {
      const data = {
        listName: this.listName
      };
      this.todoService.createList(data).subscribe(
        (apiResponse) => {
        },
        (err) => {

        }
      );
    }
  }

  public getAllLists: any = () => {
    this.todoService.getAllLists().subscribe(
      (apiResponse) => {
        this.lists = apiResponse.json();
      },
      (err) => {

      }
    );
  }

}
