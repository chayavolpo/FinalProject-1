import { Component, OnInit } from '@angular/core';
import { ClerksService } from '../../Services/clerks.service';
import { Clerk } from '../../Models/clerks.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Clerk: Clerk = new Clerk()
  constructor(private clerksService: ClerksService) { }

  login() {
    this.clerksService.loginUser(this.Clerk).subscribe((res: Clerk) => {
      if (res && res.ClerkKey) {
        console.log(res)
        this.Clerk.ClerkFName = res["ClerkFName"];
        this.Clerk.ClerkKey = res["ClerkKey"];
        this.Clerk.IfManager = res["IfManager"];
      }
      else{
       alert("בקש הרשאה מהמנהל")
      }
    }, err => {
      console.log(err)
    })
  }
  ngOnInit(): void {
  }

}
