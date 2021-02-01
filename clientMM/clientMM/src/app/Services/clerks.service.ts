import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clerk } from '../Models/clerks.model';


@Injectable({
  providedIn: 'root'
})
export class ClerksService {
  basicUrl: string = "http://localhost:59355/clerks/"
  selectedClerk: Clerk;
  constructor(private http: HttpClient) {
  }
  loginUser(Clerk: Clerk) {
    return this.http.post(this.basicUrl + "login", Clerk)
  }

  addClerk(newClerk: Clerk) {
    return this.http.post(this.basicUrl + "addClerk", newClerk);
  }
  getAllClerks() {
    return this.http.get<Clerk[]>(this.basicUrl + "getAllClerks");
  }

  updateClerk(updatedClerk: Clerk) {
    return this.http.put(this.basicUrl + "updateClerk", updatedClerk);
  }
}


