import { Component, OnInit } from '@angular/core';
import {SyllabusService} from "../../_services/syllabus.service";
import {SubjectService} from "../../_services/subject.service";
import {MajorService} from "../../_services/major.service";
import {Major} from "../../_models/major";
import {Syllabus} from "../../_models/syllabus";
import {debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction} from "rxjs";
import {SyllabusCreationDto} from "../../_models/syllabus-creation-dto";
import {NgForm} from "@angular/forms";
import {NgbPanelChangeEvent} from "@ng-bootstrap/ng-bootstrap";
import {Subject} from "../../_models/subject";
import {formatNumber} from "@angular/common";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-create-syllabus',
  templateUrl: './create-syllabus.component.html',
  styles: [`
    .card.disabled {
      opacity: 0.5;
    }
    .custom-header::after {
      content: none;
    }
  `]
})
export class CreateSyllabusComponent implements OnInit {


  majors: Major[] = [];
  createdSyllabus: SyllabusCreationDto = new SyllabusCreationDto();
  selectedMajor!: Major;
  selectedMajorSyllabi: Syllabus[] = [];
  resultMsg: string = '';
  resultMsgExisting: string = '';
  selectedSyllabusSubjects: Subject[] = [];


  constructor(
    private majorservice: MajorService,
    private syllabusService: SyllabusService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.majorservice.getAllMajors().subscribe({
      next: (value) => this.majors = value,
      error: e => console.log(e),
      complete: () => console.log("Done getting majors!, List size = " + this.majors.length)
    })
  }

  getMajorSyllabi() {
    if(this.selectedMajor.id != 0) {
      this.syllabusService
        .getSyllabiByMajorId(this.selectedMajor.id)
        .subscribe({
          next:(value) => this.selectedMajorSyllabi = value,
          error:e => console.log(e),
          complete: () => console.log(`Done getting Syllabi for Major ${this.selectedMajor.name}`)
        })
    }
  }

  formatter = (major: Major) => major.name;

  search: OperatorFunction<string, readonly {id: any, name: any}[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 1),
    map(term => this.majors.filter(major => new RegExp(term, 'mi').test(major.name)).slice(0, 10))
  );

  onSubmitNewSyllabus(newSyllabusForm: NgForm) {

    console.log(this.createdSyllabus.majorId)

    if(this.isSCreatedyllabusValid()) {
      this.syllabusService.createSyllabus(this.createdSyllabus).subscribe({
        next: (v) => {
        },
        error: (e) => {
          this.resultMsg = e.error.message;
        },
        complete: () => {
          this.resultMsg = 'Syllabus Created!'
          newSyllabusForm.reset();

        }
      })
    }


  }



  isSCreatedyllabusValid(): boolean {
    this.resultMsg = "";
    let valid = true;


    if(this.createdSyllabus.majorId == null || this.createdSyllabus.majorId == undefined) {
      valid = false;
      this.resultMsg += "You must select Major! ";
    }

    if(this.createdSyllabus.yearOfCreation == null || this.createdSyllabus.yearOfCreation == undefined) {
      valid = false;
      this.resultMsg += "You must enter date!";
    }

    if(!valid) {
      this.resultMsg = "Error " + this.resultMsg;
    }

    return valid;
  }

  onSubmitExistingSyllabus() {

  }

  setMajorCreationId() {
    if(this.selectedMajor != undefined) {
      console.log("set major creation id")
      this.createdSyllabus.majorId = this.selectedMajor.id;
    } else {
      console.log("Major id undefined ")
    }
  }


  getSelectedMajorSyllabi() {
    if(this.selectedMajor != undefined) {
      this.getMajorSyllabi();
    }

    console.log(this.selectedMajorSyllabi.length);
  }

  getSelectedSyllabusSubjects(syllabusId: number) {

    this.subjectService.getSubjectsBySyllabus(syllabusId).subscribe({
      next: (v) => this.selectedSyllabusSubjects = v,
      error: (e) => console.log(e),
      complete: () => {
        console.log("Done getting subjects!")
        console.log(this.selectedSyllabusSubjects.length)
      }
    })

  }



  panelChange(event: NgbPanelChangeEvent) {
    this.getSelectedSyllabusSubjects(parseInt(event.panelId));
  }

  deleteSubject(subjectId: number) {
    this.subjectService.deleteSubject(subjectId)
      .subscribe({

        error:(e) => {
          this.resultMsgExisting = "Cannot delete because there are students enrolled for this Subject!.";
        },

        next:(response) => {
          if(response.status === 204) {
            this.selectedSyllabusSubjects =
              this.selectedSyllabusSubjects
              .filter(subject => subject.id !== subjectId);
          }
        }
      }
    )
  }

  deleteSyllabus(syllabusId: number) {
    this.syllabusService.deleteSyllabus(syllabusId)
      .subscribe({

          error:(e) => {
            this.resultMsgExisting = "Cannot delete because there are students enrolled at this Syllabus!.";
          },

          next:(response) => {
            if(response.status === 204) {
              this.selectedMajorSyllabi =
                this.selectedMajorSyllabi
                  .filter(syllabus => syllabus.id !== syllabusId);
            }
          }
        }
      )
  }
}
