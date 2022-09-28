import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Syllabus} from "../_models/syllabus";
import {SyllabusCreationDto} from "../_models/syllabus-creation-dto";

@Injectable({
  providedIn: 'root'
})
export class SyllabusService {

  private baseURL = "http://localhost:8080/api/v1/syllabi";

  constructor(private httpClient: HttpClient) { }

  getAllSyllabi():Observable<Syllabus[]> {
    return this.httpClient.get<Syllabus[]>(`${this.baseURL}`);
  }
  getSyllabus(id: number): Observable<Syllabus> {
    return this.httpClient.get<Syllabus>(`${this.baseURL}/${id}`);
  }

  getSyllabiByMajorId(majorId: number): Observable<Syllabus[]> {
    return this.httpClient.get<Syllabus[]>(`${this.baseURL}/major/${majorId}`)
  }

  getRemainingSemesterECTS(syllabusId: number, semester: number): Observable<number> {
    return this.httpClient.get<number>(
      `${this.baseURL}/get-remaining-semester-ects/syllabus/${syllabusId}/semester/${semester}`);
  }

  createSyllabus(syllabusCreationDto: SyllabusCreationDto): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${this.baseURL}`,
      syllabusCreationDto,
      {observe: 'response'});
  }

  deleteSyllabus(syllabusId: number): Observable<HttpResponse<any>> {
    return this.httpClient
      .delete(`${this.baseURL}/${syllabusId}`,
        {observe: 'response'});
  }

}
