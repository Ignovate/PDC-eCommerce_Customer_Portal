import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute,RoutesRecognized } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { filter, pairwise } from 'rxjs/operators';
import { LocalStore } from '../store/local-store';
import { Util } from '../util/util';

@Component({
  selector: 'app-customer-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class CustomerAddressComponent implements OnInit {

  customerAddressList:any=[];
  contactform: FormGroup;
  err_message: string;
  firstname:any;
  user_request: any = {};
  address:any;
  countries:any[];
  states:any[];
  cities:any[];

  constructor(private router: Router,
    private activatedroute:ActivatedRoute,
    private customs: CustomScript,
    private server: HyperService,
    private formBuilder: FormBuilder,
    private Location:Location) {
    this.customs.loadScript()
  }

  ngOnInit() {
    // this.router.events
    // .pipe(filter((e: any) => e instanceof RoutesRecognized),
    //     pairwise()
    // ).subscribe((e: any) => {
    //   console.log(e,"eeeeeeeeeeeeeeeeeeeeee")
    //     console.log(e[0].urlAfterRedirects,"url"); // previous url
    // });
    
    this.formBuild();
    let address = LocalStore.getAndRemove("address");
    if(address) {
      this.address = address;
      this.getCountry();
      this.getState(this.address.countryId);
      this.getCity(this.address.countryId, this.address.regionId);
    } else {
      this.getCountry();
    }
    // this.activatedroute.queryParams.subscribe((params:any) => {
    //   if(Util.isEmpty(params)) {
    //     this.getCountry();
    //   } else {
    //     this.address = params;
    //     this.getCountry();
    //     this.getState(params.countryId);
    //     this.getCity(params.countryId, params.regionId);
    //     // this.setFormValues(params);
    //   }
    // });
    
    
    this.user_request.countryId = '';
    this.user_request.state = '';
    this.user_request.city = '';
  }

  customerAddress(){
    this.server.get("fetchcustomersaddress?custId="+LocalStore.get("userId"))
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
      country: [null, Validators.compose([Validators.required])],
      state: [null, Validators.compose([Validators.required])],
      city: [null, Validators.compose([Validators.required])],
      postalCode: [null, Validators.compose([Validators.required])],
      agree: [null, Validators.compose([Validators.required])],
      landmark: [null ],
      mobile: [null ]
    });
  }

  setFormValues(address) {
    let add = {
      firstname: address.firstname ? address.firstname : "",
      lastname: address.lastname ? address.lastname : "",
      streetname: address.streetname ? address.streetname : "",
      country: address.countryId ? address.countryId : "",
      state: address.regionId ? address.regionId : "",
      city: address.areaId ? address.areaId : "",
      postalCode: address.postcode ? address.postcode : "",
      agree: true,
      landmark: address.landmark ? address.landmark : "",
      mobile: address.mobile ? address.mobile : "",
    }
    // console.log("con", con);
    this.contactform.setValue(add);
  }

  getCountry() {
    this.server.get("country/all")
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.countries = data.result;
          console.log("countries", data.result);
          if(this.address)
            this.setFormValues(this.address);
        }
        else {
        }
      })
  }

  getState(countryId) {
     this.user_request.ctry_id=countryId;
    this.server.get("country/region?countryId="+countryId)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.states = data.result;
          console.log("states", data.result);
          if(this.address)
            this.setFormValues(this.address);
        }
        else {
        }
      })
  }

  getCity(countryId, regionId) {
    this.user_request.state_id=regionId;
    this.server.get("country/region/area?countryId="+countryId+"&regionId="+regionId)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.cities = data.result;
          console.log("cities", data.result);
          if(this.address)
            this.setFormValues(this.address);
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
        // "customerId": this.userData.customerId,
        // "firstname": this.user_request.firstname,
        // "lastname": this.user_request.lastname,
        // "streetname": this.user_request.streetname,
        // "countryId":this.user_request.ctry_id,
        // "regionId": this.user_request.state_id,
        // "areaId": this.user_request.city_id,
        // "postcode": this.user_request.post_code
        "id": this.address ? this.address.addressId: null,
        "customerId": LocalStore.get("userId"),
        "firstname": this.contactform.controls.firstname.value,
        "lastname": this.contactform.controls.lastname.value,
        "streetname": this.contactform.controls.streetname.value,
        "countryId":this.contactform.controls.country.value,
        "regionId": this.contactform.controls.state.value,
        "areaId": this.contactform.controls.city.value,
        "postcode": this.contactform.controls.postalCode.value
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
