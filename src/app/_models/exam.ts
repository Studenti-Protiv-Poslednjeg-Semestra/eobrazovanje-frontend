import { ExamSchedule } from "./exam-schedule";
import { Student } from "./student";

export class Exam {

  id!: number;
  points!: number;
  examScheduleDTO: ExamSchedule = new ExamSchedule();
  studentDTO: Student = new Student();

}
