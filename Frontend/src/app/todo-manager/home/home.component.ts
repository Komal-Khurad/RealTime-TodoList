import { Component, OnInit, OnDestroy } from '@angular/core';
import { TodoService } from './../todo.service';
import { ToastrService } from 'ngx-toastr';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  faBars= faBars;
  menuList = [
    'All Lists',
    'Completed Task',
    'Completed Task',
    'Settings',
    'Logout'
  ];
  public allLists = [];

  constructor(public todoService: TodoService, private toastr: ToastrService, private appService: AppService) {
    console.log('Home component constructor is called');
  }

  ngOnInit() {
    console.log('Home component OnInit is called');
  }
  public userInfo(): any {
    const userInfo = this.appService.getUserInfoFromLocalStorage();
    console.log(userInfo);
    let initials = userInfo.firstName.charAt(0).toUpperCase() + userInfo.lastName.charat(0).toUpperCase();
    let userName = userInfo.firstName + ' ' + userInfo.lastName;
    let userEmail = userInfo.email;
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
