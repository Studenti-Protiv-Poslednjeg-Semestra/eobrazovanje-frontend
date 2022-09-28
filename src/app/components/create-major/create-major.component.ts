import { Component, OnInit } from '@angular/core';
import {MajorService} from "../../_services/major.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-major',
  templateUrl: './create-major.component.html',
  styleUrls: ['./create-major.component.css']
})
export class CreateMajorComponent implements OnInit {

  duration: number = 0
  name: string = ""
  warning: string = ""

  constructor(private majorService: MajorService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.duration === 0 || this.name === ""){
      this.warning = "All fields are required"
      return
    }

    let request = {
      duration: this.duration,
      name: this.name
    }

    this.majorService.createMajor(request).subscribe((data: any) => {
      console.log(data)
    })
    this.router.navigate(["/"])
  }

}
