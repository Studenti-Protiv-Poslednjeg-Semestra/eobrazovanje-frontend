import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth-service';
import { TokenService } from '../_services/token.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private baseURL = "http://localhost:8080/api/v1";

  constructor(private authService: AuthService,
    private tokenService: TokenService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add auth header with jwt if user is logged in and request is to api url
    const token = localStorage.getItem('TOKEN');
    const isLoggedIn = this.authService.isLoggedIn() && token;
    const isApiUrl = request.url.startsWith(this.baseURL);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
