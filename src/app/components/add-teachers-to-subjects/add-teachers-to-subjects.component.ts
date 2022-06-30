import {Component, OnInit} from '@angular/core';
import {TeacherService} from "../../_services/teacher.service";
import {Router} from "@angular/router";
import {Teacher} from "../../_models/teacher";
import {Subject} from "../../_models/subject";
import {SubjectService} from "../../_services/subject.service";

@Component({
  selector: 'app-add-teachers-to-subjects',
  templateUrl: './add-teachers-to-subjects.component.html',
  styleUrls: ['./add-teachers-to-subjects.component.css']
})
export class AddTeachersToSubjectsComponent implements OnInit {

  teachers: Teacher[] = []
  subjects: Subject[] = []
  userId: number = 0
  pageUser: number = 0
  subjectId: number = 0
  pageSubject: number = 0
  isProfessor: boolean = true
  warning: string = ""

  constructor(private teacherService: TeacherService,
              private subjectService: SubjectService,
              private router: Router) {
  }


  ngOnInit(): void {
    this.teacherService.getTeachersByPage(this.pageUser).subscribe((data: Teacher[]) => {
      if (data) this.teachers = data
    })

    this.subjectService.getSubjectsByPage(this.pageSubject).subscribe((data: Subject[]) => {
      if (data) this.subjects = data
    })
  }

  // onUserPageChange(){
  //   this.teacherService.getTeachersByPage(this.pageUser).subscribe( (data: Teacher[]) => {
  //     if(data){
  //       this.teachers = data
  //     }
  //   })
  // }
  //
  // onSubjectPageChange(){
  //   this.subjectService.getSubjectsByPage(this.pageSubject).subscribe( (data: Subject[]) => {
  //     if(data){
  //       this.subjects = data
  //     }
  //   })
  // }

  onChange(newValue: any, name: string) {
    newValue = newValue.value
    if (name.match("teacher")) {
      this.userId = newValue
      return
    }
    this.subjectId = newValue
  }

  onSubmit() {
    if (!this.userId || !this.subjectId) {
      this.warning = "Please select user and subject"
      return
    }

    if (this.isProfessor) {
      this.teacherService.addProfessorOnSubject(this.userId, this.subjectId).subscribe(data => {
        console.log(data)
      })
    } else {
      this.teacherService.addAssistantOnSubject(this.userId, this.subjectId).subscribe(data => {
        console.log(data)
      })
    }

    this.subjectId = 0
    this.userId = 0
    this.warning = ""

    this.router.navigate(["/"])
  }

}
