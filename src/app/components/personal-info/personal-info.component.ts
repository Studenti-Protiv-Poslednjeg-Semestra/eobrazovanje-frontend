import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditUser } from '../../_models/edit-user';
import { TokenService } from '../../_services/token.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit {
  id!: number;
  user: EditUser = new EditUser();
  UCN: string = "";
  confirmedPassword: string = "";
  editable: boolean = false;

  constructor(private userService: UserService,
    private tokenService: TokenService,
    private router: Router) { }

  ngOnInit(): void {
    this.userService.getPersonalInfo(this.tokenService.getUserId()).subscribe(
      response => {
        if (response != null) {
          // setting edit button visible if role is teacher or admin
          let role = localStorage.getItem('ROLE')
          if (role != 'ROLE_STUDENT') {
            this.editable = true;
          }
          this.user.firstName = response.firstName;
          this.user.lastName = response.lastName;
          this.user.email = response.email;
          this.user.id = response.id;
          this.UCN = response.ucn;
        }

        else {
          console.log("No info found.");
        }
      }
    )
  }

  onEdit() {
    if (this.user.firstName === "" || this.user.lastName === "" || this.user.email === "") {
      alert("All fields must be filled.");
      return;
    }

    if (this.user.password === undefined || this.user.password === "") {
      if (this.confirmedPassword !== "") {
        alert("Passwords must match.");
        return;
      }
    }
    else {
      if (this.user.password !== this.confirmedPassword) {
        alert("Passwords must match.");
        return;
      }
    }

    this.userService.updatePersonalInfo(this.user).subscribe(
      data => {
        this.router.navigate(['']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
