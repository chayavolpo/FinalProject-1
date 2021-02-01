import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { SheltersService } from '../../Services/shelters.service';
import { Shelters } from '../../Models/shelters.model';
import { Message } from 'primeng//api';
import { AmountPeopleInShelter } from 'src/app/Models/amountPeopleInShelter';
import { fromEvent, Observable, observable } from 'rxjs';
import { DatePipe } from '@angular/common';





declare const google: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  markerOptions1 = {
    origin: {
    },
    destination: {
      infoWindow: `
         `
    },
  };
  markerOptions2 = {
    origin: {
    },
    destination: {
      infoWindow: `
       `
    },
  };
  markerOptions3 = {
    origin: {
    },
    destination: {
      infoWindow: `
       `
    },
  };
  title = 'My first AGM project';
  lat = 32.090107;
  lng = 34.838988;
  mode = "WALKING"
  ifMarker = true;
  city = "בני ברק";
  public origin: any;
  public destination: any;
  dirs: Array<any> = [];
  dir1: any = {};
  dir2: any = {};
  cityName;
  moreShelters: Shelters[];
  ifMoreShelters: boolean = false;
  msgs: Message[] = [];
  displayModal: boolean;
  AmountPeopleInShelter: AmountPeopleInShelter = new AmountPeopleInShelter();
  Shelter: Shelters = new Shelters();
  addressToUpdateAmountPPL: string;
  // on your Angular code (component, service, directive ...) 
  clickEvent: Observable<Event> = fromEvent(window, 'myCustomEvent');
  constructor(private http: HttpClient, private router: Router, private shelterService: SheltersService, private datePipe: DatePipe) {
    this.clickEvent.subscribe((param) => {
      var address = param["detail"];
      this.showModalDialog(address);
    }
    );
  }

  /// The function calculates the current location of the user by using functions of Google Maps API
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(position => {

        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.origin = { lat: this.lat, lng: this.lng };
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(this.lat, this.lng);

        let request = {
          latLng: latlng
        };

        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0] != null) {
              this.city = results[0].address_components[results[0]
                .address_components.length - 4].short_name;
              //   alert(this.city);
              // } else {
              //   alert("No address available");
            }
          }
        });

      });
    }
  }
  onMouseOver(infoWindow, $event: MouseEvent) {
    infoWindow.open();
  }

  onMouseOut(infoWindow, $event: MouseEvent) {
    infoWindow.close();
  }
  /// The function creates the route from the user's location to the nearset shelter by using functions of the AGM library
  getDirection(shelterAddress: string): boolean {
    this.ifMarker = false;
    this.origin = { lat: this.lat, lng: this.lng };
    this.destination = shelterAddress;
    return true;
  }
  getNearestShelter() {
    this.shelterService.getNearestShelter(this.lat, this.lng).subscribe((res: Shelters[]) => {
      console.log(res);
      this.moreShelters = res;
      var nearestShelter = this.moreShelters[0];
      var addressToSend = this.moreShelters[0].ShelterStreet + ' ' + this.moreShelters[0].StreetNumber + ' ' + this.moreShelters[0].City;
      var message = "עדכן את כמות השוהים במקלט";
      this.markerOptions1 = {
        origin: {
          icon: "../../../assets/Images/smallOrangeMarker.png",
          label: { color: 'black', text: 'אתה כאן' }
        },
        destination: {
          infoWindow: `
            <h3>`+ this.moreShelters[0].ShelterStreet + " " + this.moreShelters[0].StreetNumber + " " + this.moreShelters[0].City + `</h3>
            <h4>זמן ההגעה אל המקלט:`+ this.moreShelters[0].DurationValue + ` דקה/ות</h4>
            <a onclick="showDialog('`+ addressToSend.split("'").join('@') + `')">` + message + `</a>
            `
        }
      };
      console.log(nearestShelter);
      var shelterAddress = nearestShelter.ShelterStreet + " " + nearestShelter.StreetNumber + " " + nearestShelter.City;
      if (this.getDirection(shelterAddress)) {
        this.msgs = [];
        this.msgs.push({ severity: 'info', summary: '', detail: 'בעת לחיצה על מיקום מקלט, באפשרותך לעדכן את כמות השוהים במקלט' });
        this.ifMoreShelters = true;
      }
    }, err => {
      console.log(err)
    });
  }
  showMoreShelters() {
    console.log("here!!|", this.lat, "|", this.lng);
    var address1 = this.moreShelters[1].ShelterStreet + " " + this.moreShelters[1].StreetNumber + " " + this.moreShelters[1].City;
    var address2 = this.moreShelters[2].ShelterStreet + " " + this.moreShelters[2].StreetNumber + " " + this.moreShelters[2].City;
    var duration1 = this.moreShelters[1].DurationValue;
    var duration2 = this.moreShelters[2].DurationValue;
    this.dir1 = {
      origin: { lat: this.lat, lng: this.lng },
      destination: address1,
      renderOptions: { polylineOptions: { strokeColor: '#f00' }, suppressMarkers: true },
      travelMode: "WALKING"
    }
    this.dir2 = {
      origin: { lat: this.lat, lng: this.lng },
      destination: address2,
      renderOptions: { polylineOptions: { strokeColor: '#f00' }, suppressMarkers: true },
      travelMode: "WALKING"
    }
    this.markerOptions2 = {
      origin: {
        opacity: 0,
        suppressMarkers: true
      },
      destination: {
        infoWindow: `
                    <h3>`+ address1 + `</h3>
                    <h4>זמן ההגעה אל המקלט:`+ duration1 + ` דקה/ות</h4>
                    <a onclick="showDialog('`+ address1.split("'").join('@') + `')">עדכן את כמות השוהים במקלט</a>
                    `
      }
    }
    this.markerOptions3 = {
      origin: {
        opacity: 0,
        suppressMarkers: true
      },
      destination: {
        infoWindow: `
            <h3>`+ address2 + `</h3>
            <h4>זמן ההגעה אל המקלט:`+ duration2 + ` דקה/ות</h4>
            <a onclick="showDialog('`+ address2.split("'").join('@') + `')">עדכן את כמות השוהים במקלט</a>
            `
      }
    }

  }

  ngOnInit() {
    //  this.getCurrentLocation();
  }


  getAdddressByLocation(lat: number, lng: number) {
    var GEOCODING = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + '%2C' + lng + '&language=iw&key=AIzaSyDdPX8_Gp-cDDJVJGFFi1Y_kUAObIagriQ';

    this.http.get(GEOCODING).subscribe(location => {
      alert(location);
    })
  }

  goToLogIn() {
    this.router.navigate(["login"])
  }

  public renderOptions = {
    suppressMarkers: true,
  }




  public saveCount(cnt) {
    console.log(cnt)
  }
  public infoWindow: any = "1";

  public obtainInfowindow(window: any) {
    console.log(window)
    this.infoWindow = window
  }

  showModalDialog(addressToUpdate) {
    console.log(addressToUpdate);
    var latitude;
    var longitude
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': addressToUpdate }, function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat;
        longitude = results[0].geometry.location.lng;
      }
    });
    //if(this.lat == latitude && this.lng == longitude)

    this.displayModal = true;
    this.addressToUpdateAmountPPL = addressToUpdate;

    //else{
    //this.msgs = [];
    //this.msgs.push({severity:'error', summary:'', detail:'ניתן לעדכן את כמות השוהים רק בעת שהיה במקלט'});
    //}
  }
  updateAmountPPLInShelter() {
    this.displayModal = false;
    // this.AmountPeopleInShelter.Date = new Date();
    // let latest_date = this.datePipe.transform(new Date() , 'yyyy-MM-dd');
    // this.AmountPeopleInShelter.Date = new Date(latest_date);
    // console.log(this.AmountPeopleInShelter.Date);
    //this.AmountPeopleInShelter.Time = 

    this.shelterService.updateAmountPPLInShelter(this.AmountPeopleInShelter, this.addressToUpdateAmountPPL).subscribe((res) => {
      console.log("עודכן בהצלחה");
      console.log(res);
    }, err => {
      console.log("שגיאה בעדכון");
      console.log(err);
    })
  }
}

