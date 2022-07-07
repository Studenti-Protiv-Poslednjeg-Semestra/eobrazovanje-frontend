import {Student} from "./student";

export class Payment {

  id?: string;
  amount!: number;
  timestamp?: Date;
  reasonForPayment!: string;
  studentDTO!: Student;
}
