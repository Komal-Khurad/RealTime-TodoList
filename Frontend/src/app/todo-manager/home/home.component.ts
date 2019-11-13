import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
menuList = ['All Tasks', 'Completed Task', 'Completed Task', 'Settings', 'Logout'];
constructor() { }

ngOnInit() {}

public addList: any = () => {
}

}
