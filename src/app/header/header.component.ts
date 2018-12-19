import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
import { CONFIG } from '../config'; 
import { CompleterService, CompleterData } from 'ng2-completer';
import { UpperCasePipe } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  showmenu:boolean =false;
  firstname:any=[];
  _url:any;
  cat_name:string=''
  categoryList:any=[];
  dataService: CompleterData;
  search_text:string="";
  items:any=[];
  categ:any=[];
  brand:any=[];
  prod:any=[];
  isDataLoaded:boolean = false;
  constructor(private router: Router, private server: HyperService, private completerService: CompleterService) {
    this.loggedIn = LocalStorage.getValue('loggedIn')
    this.firstname=LocalStorage.getValue('userData');
    console.log(this.firstname);
    console.log(this.loggedIn,"this.loggedIn")
    this._url = this.router.url.split("/");
    this.showmenu = CONFIG.showmenu;
     
  }
  onvalueChange(newValue) {
       this.search_text = newValue;
      if(this.search_text!=""){
      this.server.get("global/filter?name="+this.search_text+""). then((data) => {
        console.log("category",data);
          if (data.status==200)
          { 
                this.categ=data.result.category;
                this.brand=data.result.brand;
                this.prod=data.result.product;
           } else
              alert("Error on updating the Item");
      });
  
   }
  }
  ngOnInit() {
    if(this._url[1]=='login' || this._url[1]=='registration'){
      this.loggedIn =false;
    }
    this.firstname=LocalStorage.getValue('userData');
    this.getCategories();
    // this.getSearchList();
  }
  viewCategory() {
    this.router.navigateByUrl('category')
  }
  // getSearchList(){
  //   this.server.get("categories/filter?name=rE")
  //     .then((data) => {
  //        if (data.status == 200) {
  //         // this.catProductList = data.result;
  //       }
  //       else {

  //       }
  //     })
  // }
  ////////////////////////////// Category List ///////////////////////////////
  getCategories(){
    this.server.get("menu")
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.categoryList = data.result;
        }
        else {

        }
      })
  }
  /////////////////////// Category Products /////////////////////////////////////////
  goToCategory(id,list){
    LocalStorage.setValue('clicked_category_name', list.categoryName)
    // location.reload();
    this.search_text=''
    this.router.navigateByUrl('category/' + id);
  }
  signOut(){
    LocalStorage.setValue('userData','');
    LocalStorage.setValue('loggedIn', false);
    CONFIG._loggedIn=false;
    this.loggedIn=false;
    this.router.navigate(['']);
    
  }
}
