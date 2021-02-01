import { Component, OnInit } from '@angular/core';
import { Shelters } from 'src/app/Models/shelters.model';
import { SheltersService } from 'src/app/Services/shelters.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-shelter',
  templateUrl: './update-shelter.component.html',
  styleUrls: ['./update-shelter.component.scss']
})
export class UpdateShelterComponent implements OnInit {
  sheltersList: Shelters[];
  constructor(private shelterService : SheltersService, private router : Router) { }

  ngOnInit(): void {
    // this.sheltersList = this.shelterService.getAllShelters();
    // console.log(this.sheltersList);
    this.shelterService.getAllShelters().subscribe(shelters=>{
    this.sheltersList = shelters;
     console.log(shelters);
     console.log(this.sheltersList);
     },
     err =>{
       alert("שגיאה בייבוא מקלטים")
     });
  }

  shelterSelected(shelter:Shelters){
     this.shelterService.selectedShelter = shelter;
     console.log(shelter);
     console.log(this.shelterService.selectedShelter )
     this.router.navigate(["shelters/updateSelectedShelter"]);
  }
  backToHomePage() {
    this.router.navigate(["login"]);
  }
  logOut() {
    localStorage.clear();
    this.router.navigate([""]);
  }
}
