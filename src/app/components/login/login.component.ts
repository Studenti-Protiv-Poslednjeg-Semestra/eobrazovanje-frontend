import {Component, OnInit} from '@angular/core';
import {LoginCredentials} from '../../login-credentials';
import {AuthService} from '../../_services/auth-service';
import {LoginService} from '../../_services/login.service';
import {TokenService} from '../../_services/token.service';
import {Router} from "@angular/router";

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
              private authService: AuthService,
              private router: Router
  ) {
      if (this.authService.isLoggedIn()) {
        this.router.navigate(["/"])
      }
  }

  onSubmit = async () => {
    this.loginService.login(this.loginCredentials).subscribe(
      (data) => {

        const decoded_token = this.tokenService.decodeToken(data.jwt);
        if (decoded_token) {
          console.log("JWT: " + data.jwt);
          console.log("ROLE: " + localStorage.getItem('ROLE'));

          this.authService.login(data.jwt, decoded_token.authorities[0].name);
          this.router.navigate(["/"])

        } else {
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
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/"])
    }
  }

  localStorageItem(id: string): any {
    return localStorage.getItem(id);
  }
}

function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}
