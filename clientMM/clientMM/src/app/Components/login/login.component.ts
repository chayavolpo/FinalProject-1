import { Component, OnInit } from '@angular/core';
import { ClerksService } from '../../Services/clerks.service';
import { Clerk } from '../../Models/clerks.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  Clerk: Clerk = new Clerk()
  ifKeyDown:boolean=false;
  loginForm:FormGroup;
  ifClerkLogin:boolean=false;
  msgs: Message[] = [];

  constructor(private fb:FormBuilder,private clerksService: ClerksService,private router:Router) {
  
   }

  login() {
    if(this.loginForm.valid){
    this.clerksService.loginUser(this.Clerk).subscribe((res: Clerk) => {
      if (res && res.ClerkKey) {
        console.log(res)
        this.Clerk.ClerkFName = res.ClerkFName;
        this.Clerk.ClerkKey = res.ClerkKey;
        this.Clerk.IfManager = res.IfManager;
      }
      else{
        this.msgs = [];
        this.msgs.push({severity:'error', summary:'Error  ', detail:"חסרה הרשאת גישה"});
      }
       
    }
    , err => {
      console.log(err)
    })
   }
   else{
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'Error  ', detail:"עליך למלא את כל השדות"});
   }
  }
  clear() {
    this.msgs = [];
  }
  ifClerkExists():boolean
  {
    if(this.Clerk.ClerkKey!=null)
    {
      this.ifClerkLogin=true;
       return true;
    }
    return false;
  }
  openAddShelter()
  {
     this.router.navigate(["shelters/addShelter"]);
  }
  ngOnInit(): void {

    this.loginForm = this.fb.group({
      userName:["",Validators.required],
      userPassword:["",Validators.required]
    });

  }

}

