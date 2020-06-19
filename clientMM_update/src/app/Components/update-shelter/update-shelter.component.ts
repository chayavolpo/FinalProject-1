import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { SheltersService } from 'src/app/Services/shelters.service';
import { AmountPeopleInShelter } from 'src/app/Models/amountPeopleInShelter';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-update-shelter',
  templateUrl: 'update-shelter.component.html',
})
export class UpdateShelterComponent {
  amountPeopleInShelter:AmountPeopleInShelter=new AmountPeopleInShelter()
  constructor(
    public dialogRef: MatDialogRef<UpdateShelterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private shelterService:SheltersService) {}

  onNoClick(): void {
    this.shelterService.updateCountPeopleInShelter(this.amountPeopleInShelter).subscribe(res=>{
      this.dialogRef.close();
    })

  }

}