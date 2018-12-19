import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute,RoutesRecognized } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
import { filter, pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {
  customerAddressList:any=[];
  contactform: FormGroup;
  country_list: any = [];
  city_list: any ={};
  state_list: any = {};
  err_message: string;
  firstname:any;
  user_request: any = {};
  userData: any = [];
  constructor(private router: Router, private customs: CustomScript, private server: HyperService, private formBuilder: FormBuilder,private Location:Location) {
    this.customs.loadScript()
  }

  ngOnInit() {
    // console.log(this.Location.back(),"hi")
    this.router.events
    .pipe(filter((e: any) => e instanceof RoutesRecognized),
        pairwise()
    ).subscribe((e: any) => {
      console.log(e,"eeeeeeeeeeeeeeeeeeeeee")
        console.log(e[0].urlAfterRedirects,"url"); // previous url
    });
    console.log("hhhhhhhhhhhh")
    this.getCountry();
    // this.getState();
    // this.getCity();
    this.formBuild();
    this.user_request.countryId = '';
    this.user_request.state = '';
    this.user_request.city = '';
    this.userData = (LocalStorage.getValue('userData') != undefined) ? LocalStorage.getValue('userData') : [];
    this.customerAddress()
  }
  customerAddress(){
    this.server.get("fetchcustomersaddress?custId="+this.userData.customerId)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.customerAddressList = data.result;
          console.log(this.customerAddressList)
        }
        else {

        }
      })
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
          this.country_list = data.result.content;
          console.log(this.country_list)
        }
        else {
        }
      })
  }
  getState(id) {
     this.user_request.ctry_id=id;
    this.server.get("countriesregion?countryID="+this.user_request.ctry_id)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.state_list = data.result.content;
          console.log(this.state_list)
        }
        else {
        }
      })
  }
  getCity(id) {
    this.user_request.state_id=id;
    this.server.get("countriesregionarea?countryID="+this.user_request.ctry_id+"&regionID="+this.user_request.state_id)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.city_list = data.result.content;
          console.log(this.city_list)
        }
        else {
        }
      })
  }
  getCityId(id){
    this.user_request.city_id=id;
  }
  contactSubmit() {
    if (this.contactform.valid) {
      this.server.post("customersaddress", {
        "customerId": this.userData.customerId,
        "firstname": this.user_request.firstname,
        "lastname": this.user_request.lastname,
        "streetname": this.user_request.streetname,
        "countryId":this.user_request.ctry_id,
        "regionId": this.user_request.state_id,
        "areaId": this.user_request.city_id,
        "postcode": this.user_request.post_code
      })
        .then((data) => {
          console.log(data)
          if (data.status == 200) {
            this.Location.back()
            // this.router.navigateByUrl('checkout')
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
  cancelSubmit(){
    this.router.navigateByUrl('checkout')
  }
}
