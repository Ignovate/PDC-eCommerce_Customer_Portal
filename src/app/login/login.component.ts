import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CONFIG } from '../config';
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { LocalStore } from '../store/local-store';
import { Util } from '../util/util';
import { LocalStorage } from '../core/services/local_storage.service';
import { masterService } from '../core/services/master.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
selector: 'app-login',
templateUrl: './login.component.html',
styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

loginform: FormGroup;
emailid: any;
password: any;
err_message: string;
userData: any = [];
showmenu: boolean = false;
cart:any;
signedUserName:string;
signedUserEmail:string;
constructor(private router: Router,
  private activatedroute:ActivatedRoute,
  private customs: CustomScript,
  private server: HyperService,
  private formBuilder: FormBuilder,
  private socialAuthService: AuthService,private masterService: masterService) {
  if(LocalStorage.isSetJWT()) {
    LocalStorage.loadJWT()
   }else{
    LocalStorage.createJWT();
   }
  LocalStorage.createJWT(); 
  CONFIG.showmenu = this.showmenu;
  // LocalStorage.loadJWT();
}

ngOnInit() {
  this.formBuild();
  this.activatedroute.queryParams.subscribe((params:any) => {
    if(!Util.isEmpty(params)) {
      this.cart = params;
    }
  });
}

formBuild() {
  this.loginform = this.formBuilder.group({
    emailid: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required])]
  });
}

public socialSignIn(socialPlatform : string) {
    
  let socialPlatformProvider;
  if(socialPlatform == "facebook"){
    socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
  }else if(socialPlatform == "google"){
    socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  } 
  
  this.socialAuthService.signIn(socialPlatformProvider).then(
    (userData) => {
      console.log(socialPlatform+" sign in data : " , userData);
      // Now sign-in with userData
      this.signedUserName = userData.name
      this.signedUserEmail = userData.email
      this.registerUser();
    }
  );
}

registerUser(){
  this.server.post("signup", {firstName: this.signedUserName,email:this.signedUserEmail,password: this.signedUserEmail,confirmPassword: this.signedUserEmail})
  .then((data) => {
    console.log(data)
    if (data.status == 200) {
      // if(data.result.message==null){
      //   this.emailid = this.signedUserEmail;
      //   this.password = this.signedUserEmail;
        
      // }else{
      //   alert("Already Register")
      // }
      this.emailid = this.signedUserEmail;
      this.password = this.signedUserEmail;
      this.onlineLogin();
    }
    else {
    }
  })
}
onlineLogin(){
  this.server.post("signin", {
    email: this.emailid,
    password: this.password
  }).then((data) => {
    console.log(data)
    if (data.status == 200) {
      // LocalStorage.setValue('token', data.result.access_token);

      this.err_message = data.result.message;
      if (data.result.message == null) {
        this.userData = data.result.customer;
          LocalStore.addJson("user", this.userData);
          LocalStore.add("userId", this.userData.customerId);
          LocalStore.add("loggedIn", true);
          LocalStorage.setValue('user', this.userData);
          LocalStorage.setValue('loggedIn', true);
          LocalStorage.setValue('user', this.userData);
         CONFIG._loggedIn = true;
        this.router.navigateByUrl('');
      }
    }
    else {
      this.err_message = data.result.message;
    }
  })
}

onSubmitLogin() {
  if (this.loginform.valid) {
    this.server.post("signin", {
      email: this.emailid,
      password: this.password
    }).then((data) => {
      console.log(data)
      if (data.status == 200) {
        // LocalStorage.setValue('token', data.result.access_token);

        this.err_message = data.result.message;
        if (data.result.message == null) {
          this.userData = data.result.customer;
          // LocalStorage.setValue('userData', this.userData);
          // LocalStorage.setValue('quoteId', this.userData.quoteId);
          LocalStorage.setValue('loggedIn', true);
          CONFIG._loggedIn = true;
          // New code
          let user = data.result.customer;
          LocalStore.addJson("user", user);
          LocalStore.add("userId", user.customerId);
          LocalStore.add("loggedIn", true);
          LocalStorage.setValue('loggedIn', true);
          LocalStorage.setValue('user', user);
          LocalStorage.setValue('cartItemCount',data.result.customer.cartItemCount)
          this.masterService.variableWatchesLogin(LocalStorage.getValue('loggedIn'))
          if(user.quoteId)
            LocalStore.add("quoteId", user.quoteId);
          if(user.cartItemCount)
            LocalStore.add("cartItemCount", user.cartItemCount);
            LocalStorage.setValue('cartItemCount',data.result.customer.cartItemCount)
            console.log(LocalStorage.getValue('cartItemCount'),"cartItemCountcartItemCount",data.result.customer.cartItemCount)
          let cart = LocalStore.getAndRemove("cart");
          if(cart){
            // let params = Object.assign({}, this.cart);
            cart["customerId"] = LocalStore.get("userId");
            if(LocalStore.get("quoteId"))
              cart["quoteId"] = LocalStore.get("quoteId");
            
            LocalStore.add("cart", cart);
            this.router.navigateByUrl("cart");
          } else {
            this.router.navigateByUrl('');
          }
        }
      }
      else {
        this.err_message = data.result.message;
      }
    })
  } else {
    this.validateAllFormFields(this.loginform);
    this.err_message = "";
  }
}

validateAllFormFields(formGroup: FormGroup) {
  Object.keys(formGroup.controls).forEach(field => {
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

goToResiter() {
  this.router.navigateByUrl('registration')
}

}
