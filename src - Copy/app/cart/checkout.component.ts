import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute ,RoutesRecognized } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CONFIG } from '../config'; 
import { LocalStore } from '../store/local-store';
import { Util } from '../util/util';

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
addressId:any;
customerId:any;
quoteId:any;
currency:any;
amount:any;
paymentUrl:any = "http://localhost:8081/gaia-ecom-service/payment";
totalItemsQty:number;
subTotal:number;
taxAmount:number;
shippingAmount:number;
grandTotal:number;
// @ViewChild('paymentForm') paymentForm : ElementRef;
// paymentForm: FormGroup;
// @ViewChild('paymentBtn') paymentBtn : ElementRef;

constructor(private router: Router,
  private customs: CustomScript,
  private server: HyperService,
  private formBuilder: FormBuilder,) { 
this.customs.loadScript()
CONFIG.showmenu = false;
this.is_selected=0;
}

ngOnInit() {
if(LocalStore.get("loggedIn")) {
  if(LocalStore.get("quoteId")) {
    this.server.get("cart/read?quoteId="+LocalStore.get("quoteId"))
    .then((data) => {
    console.log("cart", data);
    if (data.status == 200) {
      this.salesOrderData = data.result;
      this.salesOrderList = data.result.quoteOrderItems;
      LocalStore.add('quoteId', this.salesOrderData.id);
      LocalStore.add("cartItemCount", data.result.totalItems);

      this.customerId = LocalStore.get("userId");
      this.quoteId = LocalStore.get("quoteId");
      this.currency = "AED";
      this.amount = this.salesOrderData.grandTotal;
    }
    else {
      
    }
  });
  
  this.customerAddress();
  } else {
    this.router.navigateByUrl('')
  }
} else {
  this.router.navigateByUrl('login')
}
this.active_show = false;

}

goToChangeAddress(address){
  LocalStore.add("address", address);
  this.router.navigateByUrl('customer-address');
}

customerAddress(){
this.server.get("fetchcustomersaddress?custId="+LocalStore.get("userId"))
  .then((data) => {
    console.log(data)
    if (data.status == 200) {
      this.customerAddressList = data.result;
      if(this.customerAddressList.length == 1)
        this.addressId = this.customerAddressList[0].addressId;
      console.log(this.customerAddressList)
    }
    else {

    }
  })
}

updateAddress(addressId) {
console.log("aadress", addressId);
this.addressId = addressId;
// let param = Util.buildCartParam(LocalStore.get("quoteId"), null);
// param["addressId"] = addressId;
// this.server.post("cart/update", param)
//   .then((data) => {
//     console.log(data)
//     if (data.status == 200) {
//       this.salesOrderData = data.result;
//       this.salesOrderList = data.result.quoteOrderItems;
//       LocalStore.add('quoteId', this.salesOrderData.id);
//     }
//     else {

//     }
// });
}

activeAddress(list, index){
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

goToNext(){
console.log("checkout");
// let element:HTMLElement = document.getElementById('paymentBtn') as HTMLElement;
// element.click();
let param = Util.buildCartParam(null, null);
param["quoteId"] = LocalStore.get("quoteId");
param["addressId"] = this.addressId;
this.server.post("cart/update", param)
  .then((data) => {
    console.log(data)
    if (data.status == 200) {
      this.salesOrderData = data.result;
      this.salesOrderList = data.result.quoteOrderItems;
      LocalStore.add('quoteId', this.salesOrderData.id);
      LocalStore.add("cartItemCount", data.result.totalItems);

      // location.href = this.paymentUrl+"?quoteId="+LocalStore.get("quoteId");

      this.server.get("salesorder/add?quoteId="+LocalStore.get("quoteId"))
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          LocalStore.remove("quoteId");
          LocalStore.remove("cartItemCount");
          this.router.navigateByUrl('order-history')
        }
        else {
      
        }
      });

      // this.paymentForm.nativeElement.submit();
    }
    else {

    }
});
// this.paymentForm.nativeElement.submit();
}

updateToCart(params) {
this.server.post("cart/update", params)
  .then((data) => {
    console.log(data)
    if (data.status == 200) {
      this.salesOrderData = data.result;
      this.salesOrderList = data.result.quoteOrderItems;
      LocalStore.add('quoteId', this.salesOrderData.id);
      LocalStore.add("cartItemCount", data.result.totalItems);
    }
    else {

    }
});
}

removeFromCart(productId){
this.server.post("cart/delete", Util.buildCartParam(productId, 0))
  .then((data) => {
    console.log(data)
    if (data.status == 200) {
      this.salesOrderData = data.result;
      this.salesOrderList = data.result.quoteOrderItems;
      LocalStore.add('quoteId', this.salesOrderData.id);
      LocalStore.add("cartItemCount", data.result.totalItems);
    }
    else {

    }
});
}

increaseQuantity(productId, quantity) {
this.updateToCart(Util.buildCartParam(productId, quantity));
}

decreaseQuantity(productId, quantity) {
this.updateToCart(Util.buildCartParam(productId, quantity));
}

}
