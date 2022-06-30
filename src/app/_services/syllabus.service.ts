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

  getAllSyllabi():Observable<Syllabus[]> {
    return this.httpClient.get<Syllabus[]>(`${this.baseURL}`);
  }
}
