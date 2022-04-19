import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExamListFilteredComponent } from './exam-list-filtered/exam-list-filtered.component';
import { CreateExamScheduleComponent } from './create-exam-schedule/create-exam-schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    ExamListComponent,
    LoginComponent,
    ViewExamComponent,
    ExamListFilteredComponent,
    CreateExamScheduleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
