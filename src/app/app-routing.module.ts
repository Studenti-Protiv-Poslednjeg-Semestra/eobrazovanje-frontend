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
import {AddStudentsToSyllabusComponent} from "./components/add-students-to-syllabus/add-students-to-syllabus.component";
import {StudentAccountComponent} from "./components/student-account/student-account.component";
import {AllStudentsComponent} from "./components/all-students/all-students.component";
import {EnrollmentOnNextSemesterComponent} from "./components/enrollment-on-next-semester/enrollment-on-next-semester.component";
import {AddMoneyOnAccountComponent} from "./components/add-money-on-account/add-money-on-account.component";
import {RegisterTeacherComponent} from "./components/register-teacher/register-teacher.component";
import { PersonalInfoComponent } from './components/personal-info/personal-info.component';
import {RegisterStudentComponent} from "./components/register-student/register-student.component";
import {CreateSubjectComponent} from "./components/create-subject/create-subject.component";
import {CreateSyllabusComponent} from "./components/create-syllabus/create-syllabus.component";
import {UploadStudentFilesComponent} from "./components/upload-student-files/upload-student-files.component";
import {CreateMajorComponent} from "./components/create-major/create-major.component";
import {AllTeachersComponent} from "./components/all-teachers/all-teachers.component";
import {ViewEnrollmentsComponent} from "./components/view-enrollments/view-enrollments.component";

const routes: Routes = [
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
    path: "syllabi/add-student", component: AddStudentsToSyllabusComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_ADMIN"]
    }
  },
  {
    path: "payments/:studentId", component: StudentAccountComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_ADMIN"]
    }
  },
  {
    path: "payments", component: StudentAccountComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_STUDENT"]
    }
  },
  {
    path: "students", component: AllStudentsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_ADMIN"]
    }
  },
  {
    path: "enrollment", component: EnrollmentOnNextSemesterComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_STUDENT"]
    }
  },
  {
    path: "payment", component: AddMoneyOnAccountComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_STUDENT"]
    }
  },
  {
    path: "enrollments", component: ViewEnrollmentsComponent,
    canActivate: [AuthGuard],
    data: {
      role: ["ROLE_STUDENT"]
    }
  },
  {
    path: "enrollments/:studentId", component: ViewEnrollmentsComponent,
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
    path: "teachers", component: AllTeachersComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: "teachers/create", component: RegisterTeacherComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: "students/create", component: RegisterStudentComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: "majors/create", component: CreateMajorComponent,
    canActivate: [AuthGuard],
    pathMatch: "full",
    data: {
      role: ['ROLE_ADMIN']
    }
  },
  {
    path: 'personal-info', component: PersonalInfoComponent,
    canActivate: [AuthGuard],
    data: {
      role: ['ROLE_ADMIN', 'ROLE_TEACHER', 'ROLE_STUDENT']
    }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "",
    component: WelcomePageComponent
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
