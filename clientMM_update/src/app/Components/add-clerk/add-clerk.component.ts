import { Component, OnInit } from '@angular/core';
import { Clerk } from 'src/app/Models/clerks.model';
import { ClerksService } from 'src/app/Services/clerks.service';

@Component({
  selector: 'app-add-clerk',
  templateUrl: './add-clerk.component.html',
  styleUrls: ['./add-clerk.component.scss']
})
export class AddClerkComponent implements OnInit {
  Clerk:Clerk=new Clerk();
  constructor(private clerksService: ClerksService) { }

  addClerck(){
         this.clerksService.addClerk(this.Clerk).subscribe(res=>{
           if(res)
           {
             console.log(res);
           }

         },err=>{
          console.log(err)
         });
  }

  ngOnInit(): void {
  }

}
