import { Component, OnInit, AfterViewInit,EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStore } from '../store/local-store';
import { Util } from '../util/util';
import { LocalStorage } from '../core/services/local_storage.service';
import { masterService } from '../core/services/master.service';
declare var $: any;
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  value:string;
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
  input:any;
  cart_count:number=0;
  cart_count_quantity:number=0;
  constructor(private router: Router,
    private activatedroute:ActivatedRoute,
    private customs: CustomScript,
    private server: HyperService,private masterService:masterService) {
    this.customs.loadScript()
    // this.salesQuote_data = LocalStorage.getValue('salesQuoteItems');
  }

  ngOnInit() {
    console.log(LocalStorage.getValue('cartItemCount'),"cartItemCountcartItemCount11")
    this.value=LocalStorage.getValue('cartItemCount')
    this.masterService.castLogin.subscribe(value => this.isLogged = LocalStorage.getValue('loggedIn'))
    this.masterService.casting.subscribe(value => this.value = LocalStorage.getValue('cartItemCount'))
    if(LocalStore.get("loggedIn")) {
      this.input = LocalStore.getAndRemove("cart");
      if(this.input) {
        this.addToCart(this.input);
      } else if(LocalStore.get("quoteId")) {
        this.server.get("cart/read?quoteId="+LocalStore.get("quoteId"))
            .then((data) => {
            console.log("cart", data);
            if (data.status == 200) {
              this.salesOrderData = data.result;
               this.salesOrderList = data.result.quoteOrderItems;
               this.cart_count=this.salesOrderData.totalItems;
               console.log("cart_count",this.cart_count)
              // LocalStore.add('quoteId', this.salesOrderData.id);
              LocalStorage.setValue('cartItemCount',data.result.totalItems)
              this.masterService.variableWatchesLogin('true')
              this.masterService.variableWatches(data.result.totalItems)
            }
            else {
  
            }
          });
      } else {
        console.log("input not available");
        this.router.navigateByUrl('');
      }
    } else {
      this.router.navigateByUrl('login');
    }
  }

  goToContinue() {
    if (LocalStore.get("loggedIn")) {
      this.router.navigateByUrl('')
    } else {
      this.router.navigateByUrl('login')
    }
  }
  
  placeOrder() {
    this.router.navigateByUrl('checkout');
  }

  addToCart(params) {
    
    this.server.post("cart/new", params)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.salesOrderData = data.result;
          this.salesOrderList = data.result.quoteOrderItems;
          this.cart_count=this.salesOrderData.totalItems;
          this.cart_count_quantity=this.salesOrderData.totalItemsQty;
          LocalStore.add('quoteId', this.salesOrderData.id);
          // LocalStore.add("cartItemCount", data.result.totalItems);
          LocalStorage.setValue('cartItemCount',data.result.totalItems)
          this.masterService.variableWatchesLogin('true')
          this.masterService.variableWatches(data.result.totalItems)
        }
        else {

        }
    });
  }

  updateToCart(params) {
    this.server.post("cart/update", params)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.salesOrderData = data.result;
          this.salesOrderList = data.result.quoteOrderItems;
          this.cart_count_quantity=this.salesOrderData.totalItemsQty;
          LocalStore.add('quoteId', this.salesOrderData.id);
          LocalStore.add('quoteId', this.salesOrderData.id);
          LocalStore.add("cartItemCount", data.result.totalItems);
          // LocalStorage.setValue("cartItemCount", data.result.totalItems);
          LocalStorage.setValue('cartItemCount',data.result.totalItems)
          this.masterService.variableWatchesLogin('true')
          this.masterService.variableWatches(data.result.totalItems)
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
          this.cart_count=this.salesOrderData.totalItems;
          this.cart_count_quantity=this.salesOrderData.totalItemsQty;
          this.salesOrderList = data.result.quoteOrderItems;
          LocalStore.add('quoteId', this.salesOrderData.id);
          LocalStore.add("cartItemCount", data.result.totalItems);
          LocalStorage.setValue('cartItemCount',data.result.totalItems)
          this.masterService.variableWatchesLogin('true')
          this.masterService.variableWatches(data.result.totalItems)
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
