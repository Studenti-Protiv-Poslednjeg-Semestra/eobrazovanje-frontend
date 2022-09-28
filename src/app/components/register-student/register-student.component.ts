import { Component, OnInit } from '@angular/core';
import {StudentService} from "../../_services/student.service";
import {Router} from "@angular/router";
import {User} from "../../_models/user";

@Component({
  selector: 'app-register-student',
  templateUrl: './register-student.component.html',
  styleUrls: ['./register-student.component.css']
})
export class RegisterStudentComponent implements OnInit {

  user: User = new User()
  firstName: string = ""
  lastName: string = ""
  email: string = ""
  ucn: string = ""
  warning: string = ""

  constructor(private studentService: StudentService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.email === "" || this.firstName === "" || this.lastName === "" || this.ucn === ""){
      this.warning = "All fields are required"
      return
    }
    if(this.ucn.length !== 13){
      this.warning = "ucn must be 13 chars"
      return;
    }

    this.user.ucn = this.ucn
    this.user.firstName = this.firstName
    this.user.email = this.email
    this.user.lastName = this.lastName

    let request = {
      userDTO: this.user,
      semester: 0,
      funds: 0
    }
    this.studentService.createStudent(request).subscribe((data: Object) => {
      console.log(data)
    })
    this.router.navigate(["/all-students"])
  }
}
