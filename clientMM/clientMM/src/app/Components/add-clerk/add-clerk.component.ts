import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Clerk } from 'src/app/Models/clerks.model';
import { ClerksService } from 'src/app/Services/clerks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
// import {SelectItem} from 'primeng/api';



@Component({
  selector: 'app-add-clerk',
  templateUrl: './add-clerk.component.html',
  styleUrls: ['./add-clerk.component.scss',
  ],
  providers: [MessageService],
//encapsulation:ViewEncapsulation.None
})
export class AddClerkComponent implements OnInit {
  Clerk: Clerk = new Clerk();
  addClerkForm: FormGroup;
  pattern: string;

  msgs: Message[] = [];

  header: string;
  ifAdd: boolean;
  ifUpdate: boolean;
  ifDelete: boolean;

  constructor(private fb: FormBuilder, private clerksService: ClerksService, private router: Router) {
    // this.pattern= "(?=.*[0-9])"
    // + "(?=.*[a-z])(?=.*[A-Z])"
    // + "(?=.*[@#$%^&+=])"
    // + "(?=\\S+$).{8,20}$";
  }

  addClerck() {
    if(this.addClerkForm.valid){
    this.clerksService.addClerk(this.Clerk).subscribe(res => {

      console.log(res);
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: '', detail: 'המשתמש התווסף בהצלחה' });

    }, err => {
      console.log(err.error.Message);
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: '', detail: err.error.Message });
    });
  }
  else{
    this.msgs = [];
    this.msgs.push({severity:'error', summary:'', detail:"עליך למלא את כל השדות"});
  }
}
  clear() {
    this.msgs = [];
  }
  backToHomePage() {
    this.router.navigate(["login"]);
  }
  logOut()
  {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
  ngOnInit(): void {
    if(this.router.url ==='/clerks/updateSelectedClerks'){
      this.header = "עדכון משתמש"
      this.ifUpdate = true;
      this.ifAdd = false;
      this.ifDelete = false;
      this.Clerk = this.clerksService.selectedClerk;
      console.log(this.Clerk);
    }
    if(this.router.url ==='/register')
    {
      this.header = "הוספת משתמש"
      this.ifAdd = true;
      this.ifUpdate = false;
      this.ifDelete = false;
    }
    this.addClerkForm = this.fb.group({
      userFirstName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      userLastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      userPassword: ["", [Validators.required, Validators.pattern("['a-zA-z']*.{8,}")]]

    });

  }

  updateClerk(){
    if (this.addClerkForm.valid) {
      this.clerksService.updateClerk(this.Clerk).subscribe((res: Clerk) => {
        console.log(res);
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: '', detail: 'המשתמש התעדכן בהצלחה' });
      
      }
        , err => {
          console.log(err.error.Message);
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: '', detail: err.error.Message });
          // alert(err.error.Message);
        });
    }
    else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: '', detail: "עליך למלא את כל השדות" });
    }
  }
  }


