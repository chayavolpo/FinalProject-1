import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-shelter',
  templateUrl: './show-shelter.component.html',
  styleUrls: ['./show-shelter.component.scss']
})
export class ShowShelterComponent implements OnInit {
  public origin: any;
  public destination: any;
  constructor() { }
  // getDirection() {
  //   this.origin = { lat: this.lat, lng:this.lng };
  //   this.destination = { lat:32.090339, lng: 34.839437 };
   
  //   // Location within a string
  //   // this.origin = 'Taipei Main Station';
  //   // this.destination = 'Taiwan Presidential Office';
  // }
  ngOnInit(): void {
    // this.getDirection()
  }

}
