import { Component, OnInit } from '@angular/core';
import { ClerksService } from '../Services/clerks.service';
import { Clerk } from '../Models/clerks.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Clerk:Clerk=new Clerk()
  constructor(private clerksService: ClerksService) { }
  ismanager: boolean = false;
  IsManager() {
    return this.ismanager;
  }
  Login() {
     this.clerksService.LoginUser(this.Clerk).subscribe(res=>{
      if(res) {
        console.log(res)
      }
     },err=>{
       console.log(err)
     })
  }
  ngOnInit(): void {
  }

}
