import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExaminationPeriod } from '../_models/examination-period';

@Injectable({
  providedIn: 'root'
})
export class ExaminationPeriodService {

  private baseURL = "http://localhost:8080/ss/examination_periods";
  constructor(private httpClient: HttpClient) { }

  getAllExamPeriods(): Observable<ExaminationPeriod[]> {
    return this.httpClient.get<ExaminationPeriod[]>(`${this.baseURL}`);
  }
}
