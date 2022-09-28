import { Component, OnInit } from '@angular/core';
import { SubjectService } from "../../_services/subject.service";
import { Subject} from "../../_models/subject";
import { Syllabus } from "../../_models/syllabus";
import { SyllabusService} from "../../_services/syllabus.service";
import { SubjectCreationDto } from "../../_models/subject-creation-dto";

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  syllabi: Syllabus[] = [];
  syllabusSubjects: Subject[] = [];
  selectedSyllabus!: Syllabus;
  resultMsg: string = '';
  selectedSemesterRemainingECTS: number = 0;
  subjectValidSemesterRange : number[] = [];
  responsibilityTypes: String[] = [];
  createdSubject: SubjectCreationDto = new SubjectCreationDto();

  constructor(
    private syllabusService: SyllabusService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.syllabusService.getAllSyllabi().subscribe({
      next: (v) => this.syllabi = v,
      error: (e) => console.log(e),
      complete: () => console.log("done getting syllabi")
    })

    this.subjectService.getResponsibilities().subscribe({
      next: (v) => this.responsibilityTypes = v
    })
  }


  getSyllabusSubjects() {
    if(this.selectedSyllabus.id != 0) {
      this.subjectService.getSubjectsBySyllabus(this.selectedSyllabus.id).subscribe({
        next: (v) => this.syllabusSubjects = v,
        error: (e) => console.log(e),
        complete: () => {
          console.log("Done getting subjects!")
        }
      })
    }
  }

  createValidSemesterOption() : number[] {
    this.subjectValidSemesterRange = [...Array(this.selectedSyllabus.majorDTO.duration - 1 + 1).keys()].map(x => x + 1);
    return this.subjectValidSemesterRange;
  }

  onChangeSemester(event : Event) {
    this.createdSubject.semester = parseInt((event.target as HTMLInputElement).value);
    this.resetECTSInputField();
    this.getRemainingSemesterECTS();
  }

  onChangeCode(event : Event) {
    this.createdSubject.code = (event.target as HTMLInputElement).value;
  }

  onChangeName(event : Event) {
    this.createdSubject.name = (event.target as HTMLInputElement).value;
  }

  onChangeDescription(event : Event) {
    this.createdSubject.description = (event.target as HTMLInputElement).value;
  }

  onChangeECTS(event: Event) {
    this.createdSubject.ects = parseInt((event.target as HTMLInputElement).value);
  }

  onChangeSyllabus(event: Event) {
    this.createdSubject.syllabusId = this.selectedSyllabus.id;
    this.resetSemesterSelectField();
    this.resetECTSInputField();
  }

  onSubmit() {
    if(this.isSubjectValid()) {
      this.subjectService.createSubject(this.createdSubject).subscribe({
        next: (v) => {
          this.resultMsg = 'Subject Created!'
          this.resetAllInputFields();
        },
        error: (e) => {
          this.resultMsg = e.error.message;
        },
        complete: () => {

        }
      });
    } else {
      return;
    }
  }

  isSubjectValid(): boolean {

    this.resultMsg = "";
    let valid = true;

    if (this.createdSubject.code == null || this.createdSubject.code.trim() === ''){
      this.resultMsg += "Subject's Code is invalid! ";
      valid = false;
    }

    if (this.createdSubject.semester == null || this.createdSubject.semester == 0){
      this.resultMsg += "Subject's Semester is invalid! ";
      valid = false;
    }

    if (this.createdSubject.name == null || this.createdSubject.name.trim() === ''){
      this.resultMsg += "Subject's Name is invalid! ";
      valid = false;
    }

    if (this.createdSubject.description == null || this.createdSubject.description.trim() === ''){
      this.resultMsg += "Subject's Description is invalid! ";
      valid = false;
    }

    if (this.createdSubject.ects == null || this.createdSubject.ects == 0){
      this.resultMsg += "Subject's ECTS are invalid! ";
      valid = false;
    }

    if (this.createdSubject.syllabusId == 0 || this.createdSubject.syllabusId == null){
      this.resultMsg += "Subject's Syllabus is invalid! ";
      valid = false;
    }

    return valid;
  }

  print() {
    console.log(this.syllabi)
    console.log("Print");
    console.log(this.createdSubject)
  }

  resetAllInputFields() {
    this.resetSyllabusSelectField();
    this.resetSemesterSelectField();
    this.resetNameInputField();
    this.resetCodeInputField();
    this.resetDescriptionInputField();
    this.resetECTSInputField();
    this.syllabusSubjects = [];
  }

  resetSemesterSelectField() {
    let semesterSelect: HTMLSelectElement = document.getElementById("semester-select") as HTMLSelectElement;
    if(semesterSelect) {
      semesterSelect.selectedIndex = 0;
      this.createdSubject.semester = 0;
    }
  }

  resetSyllabusSelectField() {
    let syllabusSelect: HTMLSelectElement = document.getElementById("syllabus-select") as HTMLSelectElement;
    if(syllabusSelect) {
      syllabusSelect.selectedIndex = 0;
      this.createdSubject.syllabusId = 0;
    }
  }

  getRemainingSemesterECTS() {
    if(this.createdSubject.syllabusId != 0 && this.createdSubject.semester != null) {
      this.syllabusService
        .getRemainingSemesterECTS(this.createdSubject.syllabusId, this.createdSubject.semester).subscribe( {
        next: (v) => { this.selectedSemesterRemainingECTS = v },
        error: (e) => {
          this.resultMsg = e.error.message;
        },
        complete: () => {
          console.log("Got remaining semester ECTS!")
        }
      })
    }
  }

  resetECTSInputField() {
    let ectsInput: HTMLInputElement = document.getElementById("ects-input") as HTMLInputElement;
    ectsInput.value = ectsInput.defaultValue;
    this.createdSubject.ects = 0;
  }

  resetNameInputField() {
    let nameInput: HTMLInputElement = document.getElementById("name-input") as HTMLInputElement;
    nameInput.value = nameInput.defaultValue;
    this.createdSubject.name = '';
  }

  resetCodeInputField() {
    let codeInput: HTMLInputElement = document.getElementById("code-input") as HTMLInputElement;
    codeInput.value = codeInput.defaultValue;
    this.createdSubject.code = '';
  }

  resetDescriptionInputField() {
    let descriptionInput: HTMLInputElement = document.getElementById("description-input") as HTMLInputElement;
    descriptionInput.value = descriptionInput.defaultValue;
    this.createdSubject.description = '';
  }

  addResponsibilityToSubject(responsibility: HTMLSelectElement) {
    console.log("CHANGE!")
    this.createdSubject.responsibilityDefinitions.push(responsibility.value)
    responsibility.selectedIndex = 0;
  }

  removeResponsibility(responsibility: String) {
    this.createdSubject.responsibilityDefinitions = this.createdSubject.responsibilityDefinitions.filter(r => r !== responsibility);
  }

}
