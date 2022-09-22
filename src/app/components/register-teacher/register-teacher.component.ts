import { Component, OnInit } from '@angular/core';
import {TeacherService} from "../../_services/teacher.service";
import {Teacher} from "../../_models/teacher";
import {User} from "../../_models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-teacher',
  templateUrl: './register-teacher.component.html',
  styleUrls: ['./register-teacher.component.css']
})
export class RegisterTeacherComponent implements OnInit {

  teacher: Teacher = new Teacher()
  user: User = new User()
  firstName: string = ""
  lastName: string = ""
  email: string = ""
  ucn: string = ""
  warning: string = ""

  constructor(private teacherService: TeacherService,
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
      userDTO: this.user
    }

    this.teacherService.saveTeacher(request).subscribe((data: Object) => {
      console.log(data)
    })
    this.router.navigate(["/"])
  }

}
