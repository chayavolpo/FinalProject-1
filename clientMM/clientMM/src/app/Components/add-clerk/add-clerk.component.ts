import { Component, OnInit } from '@angular/core';
import { Clerk } from 'src/app/Models/clerks.model';
import { ClerksService } from 'src/app/Services/clerks.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';
// import {SelectItem} from 'primeng/api';



@Component({
  selector: 'app-add-clerk',
  templateUrl: './add-clerk.component.html',
  styleUrls: ['./add-clerk.component.scss',
],
  providers: [MessageService]

})
export class AddClerkComponent implements OnInit {
  Clerk:Clerk=new Clerk();
  addClerkForm:FormGroup;
  pattern:string;

  msgs: Message[] = [];
  
  constructor(private fb:FormBuilder,private clerksService: ClerksService) { 
    // this.pattern= "(?=.*[0-9])"
    // + "(?=.*[a-z])(?=.*[A-Z])"
    // + "(?=.*[@#$%^&+=])"
    // + "(?=\\S+$).{8,20}$";
  }

  addClerck(){
         this.clerksService.addClerk(this.Clerk).subscribe(res=>{
          
            console.log(res);
            this.msgs = [];
            this.msgs.push({severity:'success', summary:'Success  ', detail:'המשתמש התווסף בהצלחה'});
            // alert("המשתמש התווסף בהצלחה");

         },err=>{
          console.log(err.error.Message);
          this.msgs = [];
          this.msgs.push({severity:'error', summary:'Error  ', detail:err.error.Message});
          // alert(err.error.Message);
         });
  }
  clear() {
    this.msgs = [];
  }

  ngOnInit(): void {

    this.addClerkForm = this.fb.group({
       
      userFirstName:["",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      userLastName:["",[Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      userPassword:["",[Validators.required,Validators.pattern("['a-zA-z']*.{8,}")]]

    });

  }

}

