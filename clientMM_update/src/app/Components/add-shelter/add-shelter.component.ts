import { Component, OnInit } from '@angular/core';
import { Shelters } from 'src/app/Models/shelters.model';
import { SheltersService } from 'src/app/Services/shelters.service';

@Component({
  selector: 'app-add-shelter',
  templateUrl: './add-shelter.component.html',
  styleUrls: ['./add-shelter.component.scss']
})
export class AddShelterComponent implements OnInit {
  
  Shelter:Shelters=new Shelters();

  constructor(private shelterService:SheltersService) { }

  addShelter()
  {
    this.shelterService.addShelter(this.Shelter).subscribe((res: Shelters)=>{
      if(res)
      {
        alert("המקלט התווסף בהצלחה");
      }
      else
      {
        alert("אופס... ההוספה נכשלה");
      }
}
  ,err=>{
    console.log(err)
});
}

  ngOnInit(): void {
  }

}
