import { Component, OnInit } from '@angular/core';
import {Teacher} from "../../_models/teacher";
import {Subscription} from "rxjs";
import {TeacherService} from "../../_services/teacher.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-all-teachers',
  templateUrl: './all-teachers.component.html',
  styleUrls: ['./all-teachers.component.css']
})
export class AllTeachersComponent implements OnInit {

  teachers: any[] = []
  routeSub!: Subscription
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

  constructor(private teacherService: TeacherService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.getTeachers(0);
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  getTeachers(page: number) {
    this.teacherService.getTeachersByPageAndSize(page, this.itemsPerPage).subscribe((data: any) => {
      console.log(data)
      data ? this.teachers = data.content : this.resultMessage = "Something went wrong"
      this.totalElements = data.content.size
      if(this.totalElements == 0) {
        this.resultMessage = "There is no teachers"
      } else {
        this.resultMessage = ""
      }
    })
  }

  onChangePage(newPage: number) {
    this.currentPage = newPage
    this.getTeachers(newPage - 1)
  }

  onPageSizeChange(pageSize: number) {
    this.itemsPerPage = pageSize
    this.onChangePage(1)
  }
}
