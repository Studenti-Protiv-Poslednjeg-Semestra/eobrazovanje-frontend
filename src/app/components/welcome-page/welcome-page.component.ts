import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenService} from "../../_services/token.service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {}

  onClick(){
    this.router.navigate(["/login"])
  }

  localStorageItem(id: string): any {
    return localStorage.getItem(id);
  }

}
