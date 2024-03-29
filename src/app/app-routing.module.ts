import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateExamApplicationComponent } from './components/create-exam-application/create-exam-application.component';
import { CreateExamScheduleComponent } from './components/create-exam-schedule/create-exam-schedule.component';
import { ExamListFilteredComponent } from './components/exam-list-filtered/exam-list-filtered.component';
import { ExamListComponent } from './components/exam-list/exam-list.component';
import { LoginComponent } from './components/login/login.component';
import { ViewExamComponent } from './components/view-exam/view-exam.component';
import { AuthGuard } from './_helpers/auth.guard';
import {AddTeachersToSubjectsComponent} from "./components/add-teachers-to-subjects/add-teachers-to-subjects.component";
import {WelcomePageComponent} from "./components/welcome-page/welcome-page.component";
import {CreateSubjectComponent} from "./components/create-subject/create-subject.component";
import {CreateSyllabusComponent} from "./components/create-syllabus/create-syllabus.component";
import {UploadStudentFilesComponent} from "./components/upload-student-files/upload-student-files.component";

const routes: Routes = [
  // redirect to somewhere if path is empty
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: "subjects/add-teacher", component: AddTeachersToSubjectsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_ADMIN"]
    }
  },
  {
    path: "subjects/create", component: CreateSubjectComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_ADMIN"]
    }
  },
  {
    path: "syllabi/create", component: CreateSyllabusComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_ADMIN"]
    }
  },
  {
    path: "students/upload-files", component: UploadStudentFilesComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_ADMIN"]
    }
  },
  {
    path: "exams/application", component: CreateExamApplicationComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_STUDENT']
    }
  },
  {
    path: "exams/cancellation", component: CreateExamApplicationComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_STUDENT']
    }
  },
  {
    path: "exams/:examType/syllabus/:id", component: ExamListFilteredComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      role: ['ROLE_ADMIN', 'ROLE_TEACHER']
    }
  },
  {
    path: "exams/:examType/student/:id", component: ExamListFilteredComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      role: ['ROLE_ADMIN', 'ROLE_TEACHER']
    }
  },
  {
    path: 'exams/:examType', component: ExamListComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      role: ['ROLE_ADMIN','ROLE_TEACHER','ROLE_STUDENT']
    }
  },
  {
    path: 'exams/view/:id', component: ViewExamComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN','ROLE_TEACHER','ROLE_STUDENT']
    }
  },
  {
    path: "exam_schedules/create", component: CreateExamScheduleComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ROLE_ADMIN'
    }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: WelcomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
