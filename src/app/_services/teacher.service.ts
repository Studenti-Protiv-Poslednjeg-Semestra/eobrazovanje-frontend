import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher} from "../_models/teacher";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  private api: string = "http://localhost:8080/api/v1/teachers";

  constructor(private http: HttpClient) { }

  getTeachersByPage(page: number): Observable<Teacher[]>{
    return this.http.get<Teacher[]>(`${this.api}?page=${page}`)
  }

  addProfessorOnSubject(professorOnSubject: Object): Observable<Teacher>{
    return this.http.put<Teacher>(`${this.api}/professor/subjects`, professorOnSubject)
  }

  addAssistantOnSubject(professorOnSubject: Object): Observable<Teacher>{
    return this.http.put<Teacher>(`${this.api}/assistant/subjects`, professorOnSubject)
  }
}
