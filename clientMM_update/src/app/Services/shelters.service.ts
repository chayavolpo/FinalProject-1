import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Shelters } from '../Models/shelters.model';
import { AmountPeopleInShelter } from '../Models/amountPeopleInShelter';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {
  basicUrl: string = "http://localhost:59355/shelters/"
  constructor(private http: HttpClient) { }

  addShelter(newShelter: Shelters) {
    return this.http.post(this.basicUrl + "addShelter", newShelter);
  }
  updateCountPeopleInShelter(amountPeopleInShelter: AmountPeopleInShelter) {
    return this.http.post(this.basicUrl + "updateCountPeopleInShelter", amountPeopleInShelter);
  }
}
