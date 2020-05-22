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
  LoginUser(Clerk:Clerk)
  {
      return this.http.post(this.basicUrl+"login",Clerk)
  }
}