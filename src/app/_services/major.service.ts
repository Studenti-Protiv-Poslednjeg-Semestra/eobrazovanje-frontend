import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  private baseURL = "http://localhost:8080/api/v1/exams";
  constructor(private httpClient: HttpClient ) { }

  getMajors(page: number, itemsPerPage: number, examType: string, viewType: string) {

  }
}
