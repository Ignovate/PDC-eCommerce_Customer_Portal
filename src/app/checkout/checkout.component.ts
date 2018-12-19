import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute ,RoutesRecognized } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
import { CONFIG } from '../config'; 

declare var $: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  customerAddressList:any=[];
  active_show:boolean = false;
  isLogged: boolean;
  totalQuantity: any;
  productId: any;
  userData: any = [];
  fieldName: any;
  text_value: any;
  salesOrderData: any;
  salesOrderList: any = [];
  is_selected:number;
  quote_data:any;
  quoteId:any;
  constructor(private route: ActivatedRoute,private router: Router,private customs: CustomScript, private server: HyperService) { 
    this.customs.loadScript()
    CONFIG.showmenu = false;
    this.is_selected=0;
  }

  ngOnInit() {
    this.isLogged = (LocalStorage.getValue('loggedIn') != undefined) ? LocalStorage.getValue('loggedIn') : '';
    this.totalQuantity = (LocalStorage.getValue('totalItems') != undefined) ? LocalStorage.getValue('totalItems') : '';
    this.productId = (LocalStorage.getValue('productIndex') != undefined) ? LocalStorage.getValue('productIndex') : '';
    this.userData = (LocalStorage.getValue('userData') != undefined) ? LocalStorage.getValue('userData') : [];
    this.quote_data = (LocalStorage.getValue('quoteId') != undefined) ? LocalStorage.getValue('quoteId') :"";
    if (this.isLogged) {
      let obj:any = {};
      obj.quoteId = (this.userData.quoteId==null)?this.quote_data:this.userData.quoteId;
      this.quoteId = obj.quoteId;
      obj.productId = this.productId;
      if(this.userData.quoteId!=null && this.userData.quoteId!=undefined || this.quote_data!=''){
        this.cardUpdate(obj,this.totalQuantity)
      }
      
    } else {
      this.router.navigateByUrl('login')
    }
    this.active_show = false;
   
    this.customerAddress();
  }
  goToChangeAddress(){
    this.router.navigateByUrl('change-address')
  }
  quoteItems(){
    this.server.get("cart/read?quoteId="+this.userData.customerId)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          
        }
        else {

        }
      })
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
  activeAddress(list,index){
    console.log('in',this.customerAddressList,index)
    for(let i=0;i<=this.customerAddressList.length;i++){
      this.is_selected=20
      }
      this.is_selected=index;
  //   this.customerAddressList.forEach(function (item, i) {
  //     console.log(item,i,index)
  //     if (i==index) {
  //        this.active_show = true;
  //     }
  // });
  }
  ////////////////////////////////// Update TO Cart //////////////////
cardUpdate(list,quantity) {
  this.server.post("cart/update", {
    customerId:this.userData.customerId,
    productId:list.productId,
    quantity:quantity,
    websiteId:2,
    quoteId: list.quoteId
  })
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        this.salesOrderData = data.result;
        this.salesOrderList = data.result.quoteOrderItems;
      }
      else {

      }
    })
}
targetMinus(val, i) {
  console.log(val, i)
  this.salesOrderList.forEach(function (item, index) {
      console.log(item)
      if (index == i) {
          if (val.quantity > 1) {
              item.quantity--;
          }
      }
  });
  this.cardUpdate(val, val.quantity);
}
targetPlus(val, i) {
  console.log(val, i, parent)
  this.salesOrderList.forEach(function (item, index) {
      console.log(index)
      if (index == i) {
          item.quantity++;
          
      }
      
  });
  this.cardUpdate(val, val.quantity);
}
removeOrder(item){
  this.server.post("cart/delete", {
    customerId:this.userData.customerId,
    productId:item.productId,
    quantity:0,
    websiteId:2,
    quoteId: item.quoteId,
    
  })
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        this.salesOrderData = data.result;
        this.salesOrderList = data.result.quoteOrderItems;

      }
      else {

      }
    })
}
goToNext(){
  console.log("checkout")
  // this.router.navigateByUrl('order-history')
  this.server.get("salesorder/add?quoteId="+this.quoteId)
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        
        this.router.navigateByUrl('order-history')
      }
      else {

      }
    })
  
}
}
