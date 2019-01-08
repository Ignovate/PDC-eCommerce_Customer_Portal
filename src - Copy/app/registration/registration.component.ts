import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import { HyperService } from '../core/services/http.service';
import { CONFIG } from '../config'; 
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationform: FormGroup;
  username:any;
  email:any;
  password:any;
  repassword:any;
  mobile:any;
  reg_err_message: string;
  errorMessage: string = '';
  customer_details:any=[];
  showmenu:boolean =false;
  passwordPattern = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
  constructor(private formBuilder: FormBuilder,  private router: Router, private server: HyperService) { }

  ngOnInit() {
    CONFIG.showmenu = this.showmenu;
    this.formBuild()
  }
  goToSignIn(){
    this.router.navigateByUrl('login')
  }
  formBuild(){
    this.registrationform = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      mobile: [null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
      password: [null, Validators.compose([Validators.required])],
      repassword: [null, Validators.compose([Validators.required])]
    }
    , {
      validator: this.checkIfMatchingPasswords("password", 'repassword')// your validation method
    }
  );
}
checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
  return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey],
          passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
          return passwordConfirmationInput.setErrors({
              notEquivalent: true
          })
      } else {
          return passwordConfirmationInput.setErrors(null);
      }
  }
}
onRegSubmit(){
  if (this.registrationform.valid) {
    this.server.post("signup", {firstName: this.username,email:this.email, mobile:this.mobile,password: this.password,confirmPassword: this.repassword})
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.customer_details = data.result.customer;
          this.reg_err_message =  data.result.message;
          if(data.result.message==null){
            this.router.navigateByUrl('/login');
          }
          
        }
        else {
          this.reg_err_message = "Please Fill all fields";
        }
      })
  } else {
    this.validateAllFormFields(this.registrationform);
    this.reg_err_message="";
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
