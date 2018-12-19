import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isLogged: boolean;
  salesOrderList: any = [];
  salesQuote_data: any;
  salesQuotePrice: any = [];
  totalQuantity: any;
  productId: any;
  imageUrl: any = "http://167.99.153.79:8080/gaia_ecom_admin/gaiafiles?form=product";
  imageSrc: any = [];
  userData: any = [];
  salesOrderData: any;
  fieldName: any;
  text_value: any;
  quote_data:any;
  quoteId:any;
  constructor(private router: Router, private customs: CustomScript, private server: HyperService) {
    this.customs.loadScript()
    this.salesQuote_data = LocalStorage.getValue('salesQuoteItems');
  }

  ngOnInit() {
    this.isLogged = (LocalStorage.getValue('loggedIn') != undefined) ? LocalStorage.getValue('loggedIn') : '';
    this.totalQuantity = (LocalStorage.getValue('totalItems') != undefined) ? LocalStorage.getValue('totalItems') : '';
    this.productId = (LocalStorage.getValue('productIndex') != undefined) ? LocalStorage.getValue('productIndex') : '';
    this.userData = (LocalStorage.getValue('userData') != undefined) ? LocalStorage.getValue('userData') : [];
    this.quote_data = (LocalStorage.getValue('quoteId') != undefined) ? LocalStorage.getValue('quoteId') :"";
    if (this.isLogged) {
      this.router.navigateByUrl('cart')
      let obj:any = {};
      obj.quoteId = (this.userData.quoteId==null)?this.quote_data:this.userData.quoteId;
      this.quoteId = obj.quoteId;
      obj.productId = this.productId;
      if(this.userData.quoteId!=null && this.userData.quoteId!=undefined ||  this.quote_data!=''){
        this.cardUpdate(obj,this.totalQuantity)
        console.log("cart",this.cardUpdate(obj,this.totalQuantity));
      }else{
        this.cardNew()
      }
      
    } else {
      this.router.navigateByUrl('login')
    }

  }
  goToContinue() {
    if (this.isLogged) {
      this.router.navigateByUrl('')
    } else {
      this.router.navigateByUrl('login')
    }
  }
  ///////////////////// old service ///////////////////////////////
  // getSalesQuote() {
  //   this.server.get("salesquote")
  //     .then((data) => {
  //       console.log(data)
  //       if (data.status == 200) {
  //         this.salesQuotePrice = data.result._embedded.salesQuoteEntities;
  //       }
  //       else {

  //       }
  //     })
  // }
  // getSalesQuoteItems() {
  //   console.log(this.salesQuote_data)
  //   this.server.get("salesquoteitems?quoteId=" + this.salesQuote_data.quoteId)
  //     .then((data) => {
  //       console.log(data)
  //       if (data.status == 200) {
  //         this.salesOrderList = data.result._embedded.salesQuoteItemsEntities;
  //         console.log(this.salesOrderList)
  //         for (let i = 0; i < this.salesOrderList.length; i++) {
  //           this.salesOrderList[i].imageSrc = ''
  //           this.imageSrc = this.imageUrl + '&type=1' + '&id=' + this.salesOrderList[i].productId;
  //           this.salesOrderList[i].imageSrc = (this.imageSrc)
  //         }
  //         console.log(this.salesOrderList)
  //       }
  //       else {

  //       }
  //     })
  // }

  placeOrder() {
    this.router.navigateByUrl('checkout')
  }

  ////////////////////////////////// Add TO Cart //////////////////
  cardNew() {
    this.server.post("cart/new", {
      customerId:this.userData.customerId,
      productId:this.productId,
      quantity:this.totalQuantity,
      websiteId:1,
      addQuantity:false
      // customerId: 24,
      // productId: 3,
      // quantity: 4,
      // websiteId: 2
    })
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.salesOrderData = data.result;
          this.salesOrderList = data.result.quoteOrderItems;
          LocalStorage.setValue('quoteId',this.salesOrderData.id);
        }
        else {

        }
      })
  }
  
  
  removeOrder(item){
    this.server.post("cart/delete", {
      customerId:this.userData.customerId,
      productId:item.productId,
      quantity:0,
      websiteId:1,
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
  targetMinus(val, i) {
    this.salesOrderList.forEach(function (item, index) {
        if (index == i) {
            if (val.quantity > 1) {
                item.quantity--;
            }
        }
    });
    this.cardUpdate(val, val.quantity);
}
targetPlus(val, i) {
  console.log(val.quantity,"quantityeee")
   this.salesOrderList.forEach(function (item, index) {
        if (index == i) {
            item.quantity++;
            console.log(item.quantity,"quantity")
        }
        
    });
    this.cardUpdate(val, val.quantity);
}
////////////////////////////////// Update TO Cart //////////////////
cardUpdate(list,quantity) {
  this.server.post("cart/update", {
    customerId:this.userData.customerId,
    quoteId: list.quoteId,
    productId:list.productId,
    quantity:Number(quantity),
   // addQuantity:true,
    websiteId:1
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
}
