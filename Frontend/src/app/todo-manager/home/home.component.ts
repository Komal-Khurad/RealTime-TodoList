import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './../todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  menuList = [
    'All Lists',
    'Completed Task',
    'Completed Task',
    'Settings',
    'Logout'
  ];
  public allLists;

  constructor(public todoService: TodoService, private toastr: ToastrService) {
    console.log('Home component constructor is called');
  }

  ngOnInit() {
    console.log('Home component OnInit is called');
    this.todoService.getAllLists().subscribe(
      (result) => {
        console.log(result);
        this.allLists = result['data'];
      },
      (err) => {
        console.log('Some error occured');
        console.log(err.errorMessage);
        this.toastr.error('Some error occured', 'Error');
      }
    );
    console.log(this.allLists);
  }
  
  ngOnDestroy(): void {
    console.log('Home component OnDestroy is called');
  }
}
