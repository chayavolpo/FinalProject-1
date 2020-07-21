import { Component, OnInit } from '@angular/core';
import { Shelters } from 'src/app/Models/shelters.model';
import { SheltersService } from 'src/app/Services/shelters.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Message} from 'primeng/api';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-add-shelter', 
  templateUrl: './add-shelter.component.html',
  styleUrls: ['./add-shelter.component.scss'],
  providers: [MessageService]
})
export class AddShelterComponent implements OnInit {
  
  Shelter:Shelters=new Shelters();
  addShelterForm:FormGroup;
  msgs: Message[] = [];

  constructor(private fb:FormBuilder,private shelterService:SheltersService) { }

  addShelter()
  {
    this.shelterService.addShelter(this.Shelter).subscribe((res: Shelters)=>{
      console.log(res);
      this.msgs = [];
      this.msgs.push({severity:'success', summary:'Success  ', detail:'המקלט התווסף בהצלחה'});
      // alert("המקלט התווסף בהצלחה");
     
}
  ,err=>{
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

  this.addShelterForm =  this.fb.group({
      latShelter:["",Validators.required],
      lngShelter:["",Validators.required],
      maxPeople:["",[Validators.required]],
      description:["",[Validators.required,Validators.minLength(4),Validators.maxLength(50)]]
    });
  }

}

