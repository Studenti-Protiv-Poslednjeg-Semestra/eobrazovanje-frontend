import {Component, OnInit} from '@angular/core';
import {Student} from "../../_models/student";
import {Syllabus} from "../../_models/syllabus";
import {StudentService} from "../../_services/student.service";
import {Router} from "@angular/router";
import {SyllabusService} from "../../_services/syllabus.service";

@Component({
  selector: 'app-add-students-to-syllabus',
  templateUrl: './add-students-to-syllabus.component.html',
  styleUrls: ['./add-students-to-syllabus.component.css']
})
export class AddStudentsToSyllabusComponent implements OnInit {

  students: Student[] = []
  syllabi: Syllabus[] = []
  studentId: number = 0
  syllabusId: number = 0
  warning: string = ""

  constructor(private studentService: StudentService,
              private syllabusService: SyllabusService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.studentService.getNewStudents().subscribe(data => {
      if (data) this.students = data
    })
    this.syllabusService.getAllSyllabi().subscribe(data => {
      if (data) this.syllabi = data
    })
  }

  onChange(newValue: any, name: string) {
    newValue = newValue.value
    if (name.match("student")) {
      this.studentId = newValue
      return
    } else {
      this.syllabusId = newValue
    }
  }

  onSubmit() {
    if(!this.studentId || !this.syllabusId){
      this.warning = "Please select student and syllabus"
      return
    }

    this.studentService.addStudentToSyllabus(this.studentId, this.syllabusId).subscribe(response => {
      console.log(response)
    })

    this.studentId = 0
    this.syllabusId = 0
    this.warning = ""

    this.router.navigate(["/"])
  }

}
