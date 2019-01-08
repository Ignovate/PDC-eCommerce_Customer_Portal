import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CONFIG } from '../config'; 
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStore } from '../store/local-store';
import { ValueTransformer } from '@angular/compiler/src/util';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'app-customer-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class CustomerProfileComponent implements OnInit {

  profileform1:FormGroup;
  profileform2:FormGroup;
  profileform3:FormGroup;
  profileform4:FormGroup;
  customerAddressList:any=[];
  passwordPattern = "^{6,}$";
  is_name_edit: boolean = true;
  is_name_save: boolean = false;
  is_email_edit: boolean = true;
  is_email_save: boolean = false;
  is_mob_edit: boolean = true;
  is_mob_save: boolean = false;
  is_password:boolean=false;
  err_message: string;
  user_profile:any={};
  err_message1:string;
  form1_message:string;
  password_error:string='';
  pass_error:any={};
  pass_error_old:string='';pass_error_new:string='';pass_error_confirm:string='';pass_error_match:string='';pass_error_match_old:string='';
  
  constructor(private server: HyperService, private customs: CustomScript, private formBuilder: FormBuilder) { 
    this.customs.loadScript()
    // this.user_profile=LocalStorage.getValue('userData');
    this.user_profile=LocalStore.getJson("user");
    console.log(this.user_profile,"this.user_profile")
  }

  ngOnInit() {
    this.formBuild();
    this.mobileformBuild();
    this.nameformBuild();
    this.customerAddress();
  }
  nameformBuild() {
    this.profileform1 = this.formBuilder.group({
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null],
      gender: ['']
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
//   passwordformBuild(){
//     this.profileform4 = this.formBuilder.group({
//         oldpassword: [null, Validators.compose([Validators.required, Validators.pattern(this.passwordPattern)])],
//         newpassword: [null, Validators.compose([Validators.required, Validators.pattern(this.passwordPattern)])],
//         repassword: [null, Validators.compose([Validators.required])]
//     });
// }
onChangeGender(gender :string){
  this.user_profile.gender = gender;
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
    console.log(this.user_profile.gender,"this.user_profile.gender")
    if (this.profileform1.valid) {
      console.log("lastname",this.user_profile.lastName)
      this.server.put("customers/"+this.user_profile.customerId,{
        "id": this.user_profile.customerId,
        "username": this.user_profile.firstName,
        // "lastname":  this.user_profile.lastName,
        "gender":this.user_profile.gender
    }).then((data) => {
    console.log(data)
    if (data.status == 200 ) {
      // alert("Updated successfully")
      this.is_name_edit = true;
      this.is_name_save = false;
      this.form1_message='err';
    } 
    else if (data.result.response == "failed") {
      alert("failed")
    }else{
      alert("failed")
    }
})  
    }else{
      this.validateAllFormFields1(this.profileform1);
      this.form1_message = "";
    }
  }
  mobileSave(){
    if (this.profileform3.valid) {
       this.server.put("customers/"+this.user_profile.customerId,{
            "mobile": this.user_profile.mobile,
            "customerId":this.user_profile.customerId
       }).then((data) => {
       if (data.status == 200 ) {
          // alert("Updated successfully");
          this.is_mob_edit = true;
          this.is_mob_save = false;
          this.err_message='err';
        } 
        else if (data.result.response == "failed") {
          alert("failed")
        }else{
          alert("failed")
        }
    })
    }else{
      this.validateAllFormFields3(this.profileform2);
      this.err_message = "";
    }
  }
  emailSave(){
    if (this.profileform2.valid) {
        this.server.put("customers/"+this.user_profile.customerId,{
        "customerId": this.user_profile.customerId,
        "email": this.user_profile.email
     }).then((data) => {
     if (data.status == 200 ) {
      // alert("Updated successfully")
      this.is_email_edit = true;
      this.is_email_save = false;
      this.err_message1='err';
    } 
    else if (data.result.response == "failed") {
      alert("failed")
    }else{
      alert("failed")
    }
})  
    }else{
      this.validateAllFormFields(this.profileform2);
      this.err_message1 = "";
    }
  }
  clickPassword(){
    this.pass_error_old='';this.pass_error_confirm='';this.pass_error_new='';this.pass_error_match='';this.pass_error_match_old='';
    this.user_profile.oldpassword='';
    this.user_profile.newpassword='';
    this.user_profile.confirmpassword='';
    this.is_password=!this.is_password;
  }
  clearValidateMessages(){

  }
  customerAddress(){
    this.server.get("fetchcustomersaddress?custId="+this.user_profile.customerId)
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
  
  passwordSave(){
  this.pass_error_old=(this.user_profile.oldpassword==undefined || this.user_profile.oldpassword=='' ) ? "Please enter the oldpassword" : '';
  console.log(this.user_profile.oldpassword,this.pass_error_old,"this.user_profile.oldpassword",this.pass_error_old)
  this.pass_error_new=(this.user_profile.newpassword==undefined || this.user_profile.newpassword=='') ? "Please enter the newpassword" : '';
  this.pass_error_confirm=(this.user_profile.confirmpassword==undefined || this.user_profile.confirmpassword=='') ? "Please enter the confirmpassword" : '';
  this.pass_error_match_old=((this.user_profile.oldpassword != this.user_profile.password) && (this.user_profile.oldpassword!=''))?"Old password is incorrect":'';
  this.pass_error_match=((this.user_profile.newpassword != this.user_profile.confirmpassword) && (this.user_profile.confirmpassword!=undefined || this.user_profile.confirmpassword!=''))?"New & Confirm password are not matched":'';
  return (this.pass_error_old==''&&  this.pass_error_new==''&& this.pass_error_confirm==''&& this.pass_error_match=='' && this.pass_error_match_old=='')? true : false;
    
  }
  
  onSavePassword(){
     if(this.passwordSave()){
      alert("success")
      this.server.put("customers/"+this.user_profile.customerId,{
        "customerId": this.user_profile.customerId,
        "password": this.user_profile.confirmpassword
     }).then((data) => {
     if (data.status == 200 ) {
      this.clickPassword();
    } 
    else if (data.result.response == "failed") {
      alert("failed")
    }else{
      alert("failed")
    }
    })  
     }else{

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
