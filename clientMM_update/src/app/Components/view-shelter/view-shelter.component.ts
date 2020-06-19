import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UpdateShelterComponent } from '../update-shelter/update-shelter.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-view-shelter',
  templateUrl: './view-shelter.component.html',
  styleUrls: ['./view-shelter.component.scss']
})
export class ViewShelterComponent {
  animal: string;
  name: string;

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(UpdateShelterComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

