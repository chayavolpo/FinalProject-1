import { Component, OnInit ,ChangeDetectorRef } from '@angular/core';
import { ClerksService } from '../../Services/clerks.service';
import { Clerk } from '../../Models/clerks.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  Clerk: Clerk = new Clerk()
  ifKeyDown:boolean=false;
  loginForm:FormGroup;
  ifClerkLogin:boolean=false;
  msgs: Message[] = [];
  
  constructor(private fb:FormBuilder,private clerksService: ClerksService,private router:Router,private cdRef:ChangeDetectorRef) {
      
   }
   ngAfterViewChecked()
   {
     this.cdRef.detectChanges();
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
        this.msgs.push({severity:'error', summary:'', detail:"חסרה הרשאת גישה"});
      }
       
    }
    , err => {
      console.log(err)
    })
   }
   else{
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'', detail:"עליך למלא את כל השדות"});
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
      sessionStorage.setItem("ifClerkLogin",JSON.stringify(this.ifClerkLogin));
      sessionStorage.setItem("currentUser",JSON.stringify(this.Clerk));
       return true;
    }
    return false;
  }
  openAddClerk()
  {
    this.router.navigate(["register"]);
  }
  openAddShelter()
  {
     this.router.navigate(["shelters/addShelter"]);
  }
  openUpdateClerk()
  {
    this.router.navigate(["clerks/updateClerks"])
  }
  openUpdateShelter()
  {
    this.router.navigate(["shelters/updateShelter"])
  }
  logOut()
  {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
  ngOnInit(): void {
    this.ifClerkLogin=JSON.parse(sessionStorage.getItem("ifClerkLogin"));
    if(JSON.parse(sessionStorage.getItem("currentUser"))!=null)
         this.Clerk = JSON.parse(sessionStorage.getItem("currentUser"));
    console.log(sessionStorage.getItem("ifClerkLogin"));
    console.log(this.ifClerkLogin);
    this.loginForm = this.fb.group({
      userName:["",Validators.required],
      userPassword:["",Validators.required]
    });
    
  }

}

