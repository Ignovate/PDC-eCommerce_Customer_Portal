import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CONFIG } from '../config'; 
import { CompleterService, CompleterData } from 'ng2-completer';
import { UpperCasePipe } from '@angular/common';
import { LocalStore } from '../store/local-store';
import { LocalStorage } from '../core/services/local_storage.service';
import { Util } from '../util/util';
import { masterService } from '../core/services/master.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  showmenu:boolean =false;
  user:any;
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
  cartItemCount:number;
  value:string='';

  constructor(private router: Router,
    private server: HyperService,
    private completerService: CompleterService,private masterService:masterService) {
      if (LocalStorage.isSetJWT()) {
        LocalStorage.loadJWT();
        // if (LocalStorage.getValue('loggedIn') == true || LocalStorage.getValue('loggedIn') == 'true') { }
    } else {
        LocalStorage.createJWT();
    }
    this.loggedIn = LocalStorage.getValue('loggedIn')
   
  }

  onvalueChange(newValue) {
       this.search_text = newValue;
      if(this.search_text!=""){
      this.server.get("global/filter?name="+this.search_text+""). then((data) => {
        console.log("global filter", data);
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
    this.masterService.castLogin.subscribe(value => this.loggedIn = LocalStorage.getValue('loggedIn'));
    this.masterService.castLoginUser.subscribe(value => this.user = LocalStorage.getValue('user'));
    this.masterService.casting.subscribe(value => this.value = LocalStorage.getValue('cartItemCount'));
    this.value = LocalStorage.getValue('cartItemCount')
    // this.value = LocalStorage.getValue('cartItemCount')
    // console.log(this.value,"value")
    // this.loggedIn = LocalStore.get("loggedIn");
    // this.cartItemCount=LocalStorage.getValue("cartItemCount");
    // console.log(LocalStorage.getValue('cartItemCount'),"cartItemCountcartItemCount22")
    // this.user=LocalStore.getJson("user");
    // console.log("Logged In frm header", this.loggedIn,this.cartItemCount);
    // console.log("User object frm header", this.user);
    this._url = this.router.url.split("/");
    if(this._url[1]=='login' || this._url[1]=='registration'){
      this.loggedIn =false;
    }
    
    this.showmenu = CONFIG.showmenu;
    this.getCategories();
    // this.getSearchList();
  }

  clickSearchResult(key, obj) {
    if(key === "productId") {
      LocalStore.add("product", Util.getProductParam(obj.categoryId, obj.productId));
      this.router.navigateByUrl('product/'+obj.productId);
    } else if(key === "brandId") {
      LocalStore.add("products", Util.getProductsParam(key, obj.brandId, obj.name));
      this.router.navigateByUrl('products/'+obj.brandId);
    } else {
      LocalStore.add("products", Util.getProductsParam(key, obj.categoryId, obj.name));
      this.router.navigateByUrl('products/'+obj.categoryId);
    }
    
  }

  viewCategory() {
    this.router.navigateByUrl('category')
  }

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

  clickMenu(id, obj){
    this.search_text=''
    LocalStore.add("products", Util.getProductsParam("categoryId", id, obj.categoryName));
    LocalStorage.setValue("products",id)
    this.router.navigateByUrl("products/"+id);
  }

  signOut(){
    LocalStore.remove('user');
    LocalStore.remove('loggedIn');
    LocalStorage.setValue("cartItemCount",'0')
    LocalStorage.setValue("user",{})
    LocalStorage.setValue("loggedIn",false)
    CONFIG._loggedIn=false;
    this.loggedIn=false;
    this.router.navigate(['']);
    
  }
  underConstruction(){
    this.router.navigateByUrl('coming-soon');
  }
}
