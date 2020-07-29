import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap } from '@angular/google-maps';
declare const google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  lat = 0;
  lng = 0;
  zoom = 12;
  center= new google.maps.LatLng(this.lat, this.lng);
  options: google.maps.MapOptions = {
    mapTypeId:  google.maps.MapTypeId.ROADMAP,
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  constructor(private  http: HttpClient) { }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {
     
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.center=  new google.maps.LatLng(this.lat, this.lng);
      
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(this.lat, this.lng);
        let request = {
          latLng: latlng
        };   

        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              let city = results[0].address_components[results[0]
                        .address_components.length-4].short_name;
             alert(city);
            } else {
              alert("No address available");
            }
          }
        });

      });
    }
  }
  ngOnInit() {
  this.getCurrentLocation();

  }

  
  getAdddressByLocation(lat:number, lng:number){
    var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +lat+ '%2C' +lng + '&language=iw&key=AIzaSyDdPX8_Gp-cDDJVJGFFi1Y_kUAObIagriQ';

    this.http.get(GEOCODING).subscribe(location=>
      {
        alert(location);
      })

  }

}
