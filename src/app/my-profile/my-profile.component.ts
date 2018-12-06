import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CONFIG } from '../config'; 
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  profileform1:FormGroup;
  profileform2:FormGroup;
  profileform3:FormGroup;
  is_name_edit: boolean = true;
  is_name_save: boolean = false;
  is_email_edit: boolean = true;
  is_email_save: boolean = false;
  is_mob_edit: boolean = true;
  is_mob_save: boolean = false;
  err_message: string;
  user_profile:any={};
  err_message1:string;
  form1_message:string;
  constructor(private server: HyperService, private customs: CustomScript, private formBuilder: FormBuilder) { 
    this.customs.loadScript()
    this.user_profile=LocalStorage.getValue('userData');
    console.log(this.user_profile,"this.user_profile")
  }

  ngOnInit() {
    this.formBuild();this.mobileformBuild();this.nameformBuild()
  }
  nameformBuild() {
    this.profileform1 = this.formBuilder.group({
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null],
      // gender: ['', Validators.required]
     });
  }
  formBuild() {
    this.profileform2 = this.formBuilder.group({
      emailid: [null, Validators.compose([Validators.required,Validators.email])],
     });
  }
  mobileformBuild() {
    this.profileform3 = this.formBuilder.group({
      mobile: [null, Validators.compose([Validators.required,Validators.minLength(10),Validators.maxLength(10)])],
     });
  }
  editName(){
    this.is_name_edit = false;
    this.is_name_save = true;
    
  }
  cancelName(){
    this.is_name_edit = true;
    this.is_name_save = false;
    this.form1_message='err';
    this.user_profile.firstname='';
    this.user_profile.lastname='';
    this.profileform1.markAsUntouched();
  }
  editEmail(){
    this.is_email_edit = false;
    this.is_email_save = true;
    
  }
  cancelEmail(){
    this.is_email_edit = true;
    this.is_email_save = false;
    this.err_message1='err';
    this.user_profile.emailid='';
    this.profileform2.markAsUntouched();
  }
  editMobile(){
    this.is_mob_edit = false;
    this.is_mob_save = true;
    
  }
  cancelMobile(){
    this.is_mob_edit = true;
    this.is_mob_save = false;
    this.err_message='err';
    this.user_profile.mobile='';
    this.profileform3.markAsUntouched();
  }
  nameSave(){
    if (this.profileform1.valid) {
      alert("success")
      this.server.get("").then((data) => {
        console.log(data)
        if (data.status == 200 ) {
             
           
        } 
        else if (data.result.response == "failed") {
             
        }
    })
    }else{
      this.validateAllFormFields1(this.profileform1);
      this.form1_message = "";
    }
  }
  mobileSave(){
    if (this.profileform3.valid) {
       this.server.put("customers",{
            "id": this.user_profile.customerId,
            "email": this.user_profile.email,
            "mobile": this.user_profile.mobile,
            "username": this.user_profile.firstName,
            "lastname":  this.user_profile.lastName,
            "gender":this.user_profile.gender
    }).then((data) => {
        console.log(data)
        if (data.status == 200 ) {
           console.log("success")
        } 
        else if (data.result.response == "failed") {
            
        }
    })
    }else{
      this.validateAllFormFields3(this.profileform2);
      this.err_message = "";
    }
  }
  emailSave(){
    if (this.profileform2.valid) {
      alert("success")
    //   this.server.get("customers?email="+this.emailid+"&password="+this.password).then((data) => {
    //     console.log(data)
    //     if (data.status == 200 ) {
    
    //     } 
    //     else if (data.result.response == "failed") {
    //         this.err_message = data.result.message;
    //     }
    // })
    }else{
      this.validateAllFormFields(this.profileform2);
      this.err_message1 = "";
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
validateAllFormFields3(formGroup: FormGroup) {
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
validateAllFormFields1(formGroup: FormGroup) {
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
}
