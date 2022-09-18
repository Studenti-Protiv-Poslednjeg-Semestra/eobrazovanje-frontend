import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Syllabus} from "../_models/syllabus";

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  private baseURL = "http://localhost:8080/api/v1/syllabi";

  constructor(private httpClient: HttpClient) { }

  getSyllabus(id: number): Observable<Syllabus> {
    return this.httpClient.get<Syllabus>(`${this.baseURL}/${id}`);
  }

  getAllSyllabi(): Observable<Syllabus[]> {
    return this.httpClient.get<Syllabus[]>(`${this.baseURL}`);
  }

  getRemainingSemesterECTS(syllabusId: number, semester: number): Observable<number> {
    return this.httpClient.get<number>(
      `${this.baseURL}/get-remaining-semester-ects/syllabus/${syllabusId}/semester/${semester}`);

  }

}
