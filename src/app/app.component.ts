import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './_services/auth-service';
import { TokenService } from './_services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eobrazovanje-frontend';

  constructor(private router: Router, private authService: AuthService) { }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  localStorageItem(id: string): any {
    return localStorage.getItem(id);
  }
}
