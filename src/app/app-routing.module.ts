import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateExamApplicationComponent } from './create-exam-application/create-exam-application.component';
import { CreateExamScheduleComponent } from './create-exam-schedule/create-exam-schedule.component';
import { ExamListFilteredComponent } from './exam-list-filtered/exam-list-filtered.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { LoginComponent } from './login/login.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  // redirect to somewhere if path is empty
  //{ path: '', redirectTo: '', pathMatch: 'full' },
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
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
