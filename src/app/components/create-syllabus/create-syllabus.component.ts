import { Component, OnInit } from '@angular/core';
import {SyllabusService} from "../../_services/syllabus.service";
import {SubjectService} from "../../_services/subject.service";
import {MajorService} from "../../_services/major.service";

@Component({
  selector: 'app-create-syllabus',
  templateUrl: './create-syllabus.component.html',
  styleUrls: ['./create-syllabus.component.css']
})
export class CreateSyllabusComponent implements OnInit {

  constructor(
    private majorservice: MajorService,
    private syllabusService: SyllabusService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {

  }

  onSubmit() {

  }

}
