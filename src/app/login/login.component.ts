import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CONFIG } from '../config';
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
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
  constructor(private router: Router, private customs: CustomScript, private server: HyperService, private formBuilder: FormBuilder) {
    // if(LocalStorage.isSetJWT()) {
    //   LocalStorage.loadJWT()
    //  }else{
    //   LocalStorage.createJWT();
    //  }
    // LocalStorage.createJWT(); 
    CONFIG.showmenu = this.showmenu;
    LocalStorage.loadJWT()
  }

  ngOnInit() {
    this.formBuild();
    LocalStorage.setValue('loggedIn', false);
    LocalStorage.setValue('userData', []);
  }
  formBuild() {
    this.loginform = this.formBuilder.group({
      emailid: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
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
            LocalStorage.setValue('userData', this.userData);
            LocalStorage.setValue('loggedIn', true);
            CONFIG._loggedIn = true;
            this.router.navigateByUrl('cart');
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
