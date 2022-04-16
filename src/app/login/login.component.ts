import { Component, OnInit } from '@angular/core';
import { LoginCredentials } from '../login-credentials';
import { AuthService } from '../_services/auth-service';
import { LoginService } from '../_services/login.service';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token!: string;
  loginCredentials: LoginCredentials = new LoginCredentials();
  resultMsg: string = "";

  constructor(private loginService: LoginService,
    private tokenService: TokenService,
    private authService: AuthService) { }

  onSubmit = async () => {
    this.loginService.login(this.loginCredentials).subscribe(
      (data) => {

        const decoded_token = this.tokenService.decodeToken(data.jwt);
        if (decoded_token) {
          console.log("JWT: " + data.jwt);
          console.log("ROLE: " + localStorage.getItem('ROLE'));

          if (localStorage.getItem('ROLE') == "ROLE_STUDENT") {

          }
          else if (localStorage.getItem('ROLE') == "ROLE_TEACHER") {

          }
          else if (localStorage.getItem('ROLE') == "ROLE_ADMIN"){

          }

          this.authService.login(data.jwt, decoded_token.authorities[0].name);

          // until redirection pages are made
          this.resultMsg = "You have successfully logged in as: " + localStorage.getItem('ROLE')?.substring(5,);
        }
        else {
          console.log("Not able to decode this token.");
          this.resultMsg = "Server error";
        }
      },
      (error) => {
        console.log(error);
        this.resultMsg = "Invalid credentials";
      });
  }

  ngOnInit(): void {
  }

}

function jwt_decode(token: string): any {
    throw new Error('Function not implemented.');
}
