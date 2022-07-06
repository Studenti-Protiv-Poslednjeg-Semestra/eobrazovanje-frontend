import {Component, OnInit} from '@angular/core';
import {Student} from "../../_models/student";
import {Subscription} from "rxjs";
import {StudentService} from "../../_services/student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {

  students: Student[] = []
  routeSub!: Subscription;
  currentPage: number = 1
  itemsPerPage: number = 5
  totalElements!: number
  totalPageNumber: Array<any> = []
  resultMessage: string = ""

  pageSizes = [
    {id: 1, size: 5},
    {id: 2, size: 10},
    {id: 3, size: 20}
  ];


  constructor(private studentService: StudentService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getStudents(0)
  }

  getStudents(page: number) {
    this.studentService.getAllStudentsPageAndSize(page, this.itemsPerPage).subscribe((data: Student[]) => {
      data ? this.students = data : this.resultMessage = "Something went wrong"
      this.totalElements = data.length
      if (this.totalElements == 0) {
        this.resultMessage = "There is no students"
      } else {
        this.resultMessage = ""
      }
    })
  }

  onChangePage(newPage: number) {
    this.currentPage = newPage
    this.getStudents(newPage - 1)
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize
    this.onChangePage(1)
  }

  onClickStudentPayments(studentId: number) {
    this.router.navigate([`payments/${studentId}`])
  }

}
