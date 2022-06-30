import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ViewExamComponent } from './components/view-exam/view-exam.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ExamListFilteredComponent } from './components/exam-list-filtered/exam-list-filtered.component';
import { CreateExamScheduleComponent } from './components/create-exam-schedule/create-exam-schedule.component';
import { CreateExamApplicationComponent } from './components/create-exam-application/create-exam-application.component';
import { AddTeachersToSubjectsComponent } from './components/add-teachers-to-subjects/add-teachers-to-subjects.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { AddStudentsToSyllabusComponent } from './components/add-students-to-syllabus/add-students-to-syllabus.component';


@NgModule({
  declarations: [
    AppComponent,
    ExamListComponent,
    LoginComponent,
    ViewExamComponent,
    ExamListFilteredComponent,
    CreateExamScheduleComponent,
    CreateExamApplicationComponent,
    AddTeachersToSubjectsComponent,
    WelcomePageComponent,
    AddStudentsToSyllabusComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
