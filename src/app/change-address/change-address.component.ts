import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {
  contactform: FormGroup;
  country_list: any = [];
  city_list: any = [];
  state_list: any = [];
  err_message: string;
  firstname:any;
  user_request: any = {};
  constructor(private router: Router, private customs: CustomScript, private server: HyperService, private formBuilder: FormBuilder) {
    this.customs.loadScript()
  }

  ngOnInit() {
    this.getCountry();
    this.getState();
    this.getCity();
    this.formBuild();
    this.user_request.countryId = '';
    this.user_request.state = '';
    this.user_request.city = '';
  }
  formBuild() {
    this.contactform = this.formBuilder.group({
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      streetname: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      countryId: [null, Validators.compose([Validators.required])],
      post_code: [null, Validators.compose([Validators.required])],
      agree: [null, Validators.compose([Validators.required])],
      landmark: [null ],
      mobile: [null ]
    });
  }
  getCountry() {
    this.server.get("countries")
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.country_list = data.result._embedded.countriesEntities;
          console.log(this.country_list)
        }
        else {
        }
      })
  }
  getState() {
    this.server.get("countriesregion?countryID=1")
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.state_list = data.result._embedded.countriesRegionEntities;
          console.log(this.country_list)
        }
        else {
        }
      })
  }
  getCity() {
    this.server.get("countriesregionarea?countryID=1&regionID=1")
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.city_list = data.result._embedded.countriesRegionAreaEntities;
          console.log(this.country_list)
        }
        else {
        }
      })
  }
  contactSubmit() {
    if (this.contactform.valid) {
      this.server.post("customersaddress", {
        "id": 7,
        "custId": 1,
        "firstname": this.user_request.firstname,
        "lastname": this.user_request.lastname,
        "streetname": this.user_request.streetname,
        "countryId":1,
        "regionId": 1,
        "areaId": 1,
        "postcode": 1
      })
        .then((data) => {
          console.log(data)
          if (data.status == 200) {
            alert("success")
          }
          else {
            this.err_message = "Please Fill all fields";
          }
        })
    } else {
      this.validateAllFormFields(this.contactform);
      this.err_message = "";
    }
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
