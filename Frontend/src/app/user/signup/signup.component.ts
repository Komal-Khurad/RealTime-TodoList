import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../../app.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public firstName: any;
  public lastName: any;
  public mobile: any;
  public email: any;
  public password: any;

  constructor(
    public appService: AppService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  public goToSignIn: any = () => {
    this.router.navigate(['/login']);
  } // end of goToSignIn function

  public signupFunction: any = () => {
    if (!this.firstName) {
      this.toastr.warning('Enter First Name');
    } else if (!this.lastName) {
      this.toastr.warning('Enter Last Name');
    } else if (!this.mobile) {
      this.toastr.warning('Enter Mobile Number');
    } else if (!this.email) {
      this.toastr.warning('Enter Email');
    } else if (!this.password) {
      this.toastr.warning('Enter Password');
    } else {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        mobile: this.mobile,
        email: this.email,
        password: this.password
      };
      console.log(data);

      this.appService.signupFunction(data).subscribe(
        apiResponse => {
          console.log(apiResponse);

          if (apiResponse.status === 200) {
            this.toastr.success('Signup Successfully!');

            setTimeout(() => {
              this.goToSignIn();
            }, 2000);
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        err => {
          this.toastr.error('Some error occured');
        }
      );
    } // end of condition
  } // end of sign up function
}
