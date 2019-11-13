import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

  constructor(
    public appService: AppService,
    public router: Router,
    public toastr: ToastrService,
    public Cookie: CookieService
  ) {}

  ngOnInit() {

  }
  public goToSignUp: any = () => {
    this.router.navigate(['/signup']);
  } // end of goToSignUp

  public signinFunction: any = () => {
    if (!this.email) {
      this.toastr.warning('Enter Email');
    } else if (!this.password) {
      this.toastr.warning('Enter Password');
    } else {
      const data = {
        email: this.email,
        password: this.password
      };
      this.appService.signinFunction(data).subscribe(
        apiResponse => {
          if (apiResponse.status === 200) {
            console.log(apiResponse);

            this.Cookie.set('authtoken', apiResponse.data.authToken);
            this.Cookie.set('receiverId', apiResponse.data.userDetails.userId);
            this.Cookie.set(
              'receiverName',
              apiResponse.data.userDetails.firstName +
                ' ' +
                apiResponse.data.userDetails.lastName
            );
            this.appService.setUserInfoInLocalStorage(
              apiResponse.data.userDetails
            );
            this.router.navigate(['/home']);
          } else {
            this.toastr.error(apiResponse.message);
          }
        },
        err => {
          this.toastr.error('Some error occured!');
        }
      );
    } // end of condition
  }// end of sign in function
}
