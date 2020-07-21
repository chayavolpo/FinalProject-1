import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Clerk } from '../Models/clerks.model';


@Injectable({
  providedIn: 'root'
})
export class ClerksService {
  basicUrl:string="http://localhost:59355/clerks/"
  constructor(private http:HttpClient) {
  }
  loginUser(Clerk:Clerk)
  {
      return this.http.post(this.basicUrl+"login",Clerk)
  }
 
  addClerk(newClerk:Clerk)
  {
     return this.http.post(this.basicUrl+"addClerk",newClerk);
  }

}

