import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamListFilteredComponent } from './exam-list-filtered/exam-list-filtered.component';
import { ExamListComponent } from './exam-list/exam-list.component';
import { LoginComponent } from './login/login.component';
import { ViewExamComponent } from './view-exam/view-exam.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  // redirect to somewhere if path is empty
  //{ path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'exams', component: ExamListComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      role: ['ROLE_ADMIN','ROLE_TEACHER','ROLE_STUDENT']
    }
  },
  {
    path: 'exams/:id', component: ViewExamComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN','ROLE_TEACHER','ROLE_STUDENT']
    }
  },
  {
    path: "exams/student/:id", component: ExamListFilteredComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN','ROLE_TEACHER']
    }
  },
  {
    path: "exams/syllabus/:id", component: ExamListFilteredComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN','ROLE_TEACHER']
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
