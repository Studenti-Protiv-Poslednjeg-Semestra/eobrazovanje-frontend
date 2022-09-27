import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Major} from "../_models/major";

@Injectable({
  providedIn: 'root'
})
export class MajorService {

  private baseURL = "http://localhost:8080/api/v1/majors";
  constructor(private httpClient: HttpClient ) { }

  getAllMajors(): Observable<Major[]> {
    return this.httpClient.get<Major[]>(`${this.baseURL}`);
  }

}
