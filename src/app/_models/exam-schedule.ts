import { ExaminationPeriod } from "./examination-period";
import { Subject } from "./subject";

export class ExamSchedule {
  id!: number;
  timeOfExam!: string;
  subjectDTO: Subject = new Subject();
  place!: string;
  examinationPeriodDTO: ExaminationPeriod = new ExaminationPeriod();
}
