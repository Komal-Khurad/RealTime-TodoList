import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './user/welcome/welcome.component';

import { UserModule } from './user/user.module';
import { TodoManagerModule } from './todo-manager/todo-manager.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppService } from './app.service';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    UserModule,
    TodoManagerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: 'welcome', component: WelcomeComponent, pathMatch: 'full'},
      {path: '', redirectTo: 'welcome', pathMatch: 'full'},
      {path: '*', component: WelcomeComponent},
      {path: '**', component: WelcomeComponent},
    ])
  ],
  providers: [AppService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
