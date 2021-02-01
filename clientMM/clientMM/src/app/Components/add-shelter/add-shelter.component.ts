import { Component, OnInit, ViewChild } from '@angular/core';
import { Shelters } from 'src/app/Models/shelters.model';
import { SheltersService } from 'src/app/Services/shelters.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import {FilterUtils} from 'primeng/utils';
import { CountryService } from 'src/app/Services/country.service';
import {AgmCoreModule, MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-add-shelter',
  templateUrl: './add-shelter.component.html',
  styleUrls: ['./add-shelter.component.scss'],
  providers: [MessageService]
})
export class AddShelterComponent implements OnInit {

   placeSearch;
   autocomplete;
   componentForm = {
    street_number: "short_name",
    route: "long_name",
    locality: "long_name",
    administrative_area_level_1: "short_name",
    country: "long_name",
    postal_code: "short_name"
  };
  Shelter: Shelters = new Shelters();
  addShelterForm: FormGroup;
  msgs: Message[] = [];
  Cities:any[]=["ירושלים","בני ברק","ראשון לציון"];
  filteredCities:any[];
  City:any;
  CityName:string;

   adressType: string;

   Address:string;
  @ViewChild('addresstext') addresstext: any;

  country: any;

    countries: any[];

    filteredCountriesSingle: any[];

    filteredCountriesMultiple: any[];

    ifAdd: boolean;
    ifUpdate: boolean;
    ifDelete: boolean;
    header: string;

  constructor(private fb: FormBuilder, private shelterService: SheltersService, private router: Router, private countryService : CountryService) 
  { 
  }
  
  addShelter() {
    if (this.addShelterForm.valid) {
      var place = this.autocomplete.getPlace();
      if(place == undefined){
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: '', detail:'כתובת לא חוקית' });
        return;
      }
      var addressArray = place["address_components"];
      var city="",street="",number;
      for(var i=0;i<addressArray.length;i++){
        switch(addressArray[i].types[0]){
          case "street_number":
            number = addressArray[i].long_name; break;
          case "route":
            street = addressArray[i].long_name; break;
          case "locality":
            city=addressArray[i].long_name; break;
        }
      }
      this.Shelter.City = city;
      this.Shelter.ShelterStreet = street;
      this.Shelter.StreetNumber = number;
      this.shelterService.addShelter(this.Shelter).subscribe((res: Shelters) => {
        console.log(res);
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: '', detail: 'המקלט התווסף בהצלחה' });
        place = undefined;
        // alert("המקלט התווסף בהצלחה");
      }
        , err => {
          console.log(err.error.Message);
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: '', detail: err.error.Message });
          // alert(err.error.Message);
        });
    }
    else {
      this.msgs = [];
      this.msgs.push({ severity: 'error', summary: '', detail: "עליך למלא את כל השדות" });
    }
  }
  
  backToHomePage() {
    this.router.navigate(["login"]);
  }
  logOut()
  {
    sessionStorage.clear();
    this.router.navigate([""]);
  }
  ngOnInit(): void {
    if(this.router.url ==='/shelters/updateSelectedShelter'){
      this.header = "עדכון מקלט"
      this.ifUpdate = true;
      this.ifAdd = false;
      this.ifDelete = false;
      this.Shelter = this.shelterService.selectedShelter;
      this.Address = this.Shelter.ShelterStreet + " " + this.Shelter.StreetNumber + " " + this.Shelter.City;
      console.log(this.Shelter);
    }
    if(this.router.url ==='/shelters/addShelter')
    {
      this.header = "הוספת מקלט"
      this.ifAdd = true;
      this.ifUpdate = false;
      this.ifDelete = false;
    }
    this.addShelterForm = this.fb.group({
      AddressShelter: ["", Validators.required],
      maxPeople: ["", [Validators.required]],
      description: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
    this.initAutocomplete();
  }


 initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  this.autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete") as HTMLInputElement,
    {
      types: ["address"]
    }
  ); // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.הת
  this.autocomplete.setFields(["address_component"]); // When the user selects an address from the drop-down, populate the
  // address fields in the form.

   //this.autocomplete.addListener("place_changed", this.fillInAddress);
}

 fillInAddress() {
  // Get the place details from the autocomplete object.
const place = this.autocomplete.getPlace();
console.log(this.autocomplete.getPlace());
  for (const component in this.componentForm) {
    (document.getElementById(component) as HTMLInputElement).value = "";
    (document.getElementById(component) as HTMLInputElement).disabled = false;
  } // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.

  for (const component of place.address_components) {
    const addressType = component.types[0];

    if (this.componentForm[addressType]) {
      const val = component[this.componentForm[addressType]];
      (document.getElementById(addressType) as HTMLInputElement).value = val;
    }
  }
} 

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
 geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      this.autocomplete.setBounds(circle.getBounds());
      console.log(this.autocomplete.getPlace());
    });
  }
}

updateShelter(){
  if (this.addShelterForm.valid) {
    this.shelterService.updateShelter(this.Shelter).subscribe((res: Shelters) => {
      console.log(res);
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: '', detail: 'המקלט התעדכן בהצלחה' });
      // alert("המקלט התווסף בהצלחה");
    }
      , err => {
        console.log(err.error.Message);
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: '', detail: err.error.Message });
        // alert(err.error.Message);
      });
  }
  else {
    this.msgs = [];
    this.msgs.push({ severity: 'error', summary: '', detail: "עליך למלא את כל השדות" });
  }
}
 doGeocode() {
  var addr = this.Address  
  console.log(addr);
  // Get geocoder instance
  var geocoder = new google.maps.Geocoder();
  // Geocode the address
  geocoder.geocode({
    'address': addr
  }, function(results, status) {
    if (!(status === google.maps.GeocoderStatus.OK && results.length > 0)) {
      // show an error if it's not
      console.log("Invalid address");
    }
    else
    {
      console.log("לא נכנס ל- if")
    }
  });
};
}
