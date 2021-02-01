import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shelters } from '../Models/shelters.model';
import { AmountPeopleInShelter } from '../Models/amountPeopleInShelter';
import { Observable } from 'rxjs';
import { Time } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class SheltersService {
  basicUrl: string = "http://localhost:59355/shelters/";
  // sheltersList: Shelters[];
  selectedShelter: Shelters;
  constructor(private http: HttpClient) {


  }

  addShelter(newShelter: Shelters) {
    return this.http.post(this.basicUrl + "addShelter", newShelter);
  }
  updateCountPeopleInShelter(amountPeopleInShelter: AmountPeopleInShelter) {
    return this.http.post(this.basicUrl + "updateCountPeopleInShelter", amountPeopleInShelter);
  }
 
 
  getNearestShelter(lat:number,lng:number)
  {
      return this.http.get<Shelters[]>(this.basicUrl+"getNearestShelter/"+lat+"/"+lng);
  }
  getAllShelters()
  {
    return this.http.get<Shelters[]>(this.basicUrl+"getAllShelters");
  }

  updateShelter(updatedShelter: Shelters) {
    return this.http.put(this.basicUrl + "updateShelter", updatedShelter);
  }

  updateAmountPPLInShelter(amountPeople:AmountPeopleInShelter,AddressToUpdateAmountPPL:string){
    amountPeople.AmountpplKey=0;
    amountPeople.Date = new Date();
    amountPeople.ShelterKey = 0;
    amountPeople.Time = null;
    
  console.log(amountPeople)
    return this.http.post(this.basicUrl + "updateAmountPeopleInShelter/"+AddressToUpdateAmountPPL,
  amountPeople)
  }
}



