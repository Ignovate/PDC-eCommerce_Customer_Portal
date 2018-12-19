import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
declare var $: any;
@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  productItem: any = [];
  produtsPrice: any = [];
  quantity: number = 0;
  text_value: any;
  total_amnt: number;
  salesItems: any = [];
  salesQuoteItems:any=[];
  productList:any=[];
  relatedproductList:any;
  productTypeList:any=[];
  productId:any;
  categoryId;any;
  imageUrl:any="http://167.99.153.79:8080/gaia_ecom_admin/gaiafiles?form=product";
  imageSrc:any;
  maxvalue:number;
  maxcount :boolean;
  cutomerId:any;
  subscribe: any;
  categoryid: number;
  product_item_list:any=[];
  relatedImages:any;
  wishlistOptions={items: 5, dots: false, nav: true};
  constructor(private route: ActivatedRoute,private router: Router,private customs: CustomScript, private server: HyperService) {
    this.customs.loadScript()
    
  }

  ngOnInit() {
    this.subscribe = this.route.params.subscribe(params => {
      this.categoryId = params['catid'];
      this.productId = params['id'];
  });
 
  this.getRelatedPrduct();
   this.imageSrc = "";
   this.getProductItemDetails();
  }


  getProduct() {
    this.server.get("productattrwithinvntryandstock?id="+this.productId)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.productItem = data.result[0];
          let maxvalue:number;
          maxvalue =  this.productItem.stockCount;
          this.maxvalue =  this.productItem.stockCount;
          $(".showerr").hide();
          $('.qtyplus').click(function (e) {
            // Stop acting like a button
            e.preventDefault();
            // Get the field name
            this.fieldName = $(this).attr('field');
            // Get its current value
            var currentVal = parseInt($('input[name=' + this.fieldName + ']').val());
            // If is not undefined
            if (!isNaN(currentVal) && currentVal<maxvalue) {
              // Increment
              $('input[name=' + this.fieldName + ']').val(currentVal + 1);
              $(".showerr").hide();
            } else {
              // Otherwise put a 0 there
              $(".showerr").show();
              $('input[name=' + this.fieldName + ']').val(maxvalue);

            }
      
          });
          // This button will decrement the value till 0
          $(".qtyminus").click(function (e) {
            $(".showerr").hide();
            // Stop acting like a button
            e.preventDefault();
            // Get the field name
            this.fieldName = $(this).attr('field');
            // Get its current value
            var currentVal = parseInt($('input[name=' + this.fieldName + ']').val());
            // If it isn't undefined or its greater than 0
            if (!isNaN(currentVal) && currentVal > 1) {
              // Decrement one
              $('input[name=' + this.fieldName + ']').val(currentVal - 1);
            } else {
              // Otherwise put a 0 there
              $('input[name=' + this.fieldName + ']').val(1);
            }
      
      
          });
          this.productsList();
        }
        else {

        }
      })
  }
  getRelatedPrduct(){
    this.server.get("relatedproducts?categoryId="+this.categoryId)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.relatedproductList = data.result;
        }
        else {
           
        }
      })
  }
  productsList(){
    this.server.get("product/"+this.productItem.id)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.productList = data.result;
          this.productsType();
        }
        else {

        }
      })
  }
  productsType(){
    this.server.get("productstype/"+this.productList.typeID)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.productTypeList = data.result;
        }
        else {

        }
      })
  }
  getProductsPrice() {
    this.server.get("productsprice")
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.produtsPrice = data.result._embedded.productsPriceEntities[0];
        }
        else {

        }
      })
  }
  thumbnail:any;description:any;composition:any;usage:any;specialPrice:any;price:any;stockStatus:any;image:any;name:any;
  getProductItemDetails(){
    this.server.get("product/single?productId="+this.productId)
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        this.product_item_list = data.result;
        this.thumbnail=this.product_item_list.image.thumbnail1;
        this.description=this.product_item_list.attribute.description;
        this.composition=this.product_item_list.attribute.composition;
        this.usage=this.product_item_list.attribute.usage;
        this.specialPrice=this.product_item_list.price.specialPrice;
        this.price=this.product_item_list.price.price;
        this.stockStatus=this.product_item_list.inventory.stockStatus;
        this.image=this.product_item_list.image.image;
        this.name=this.product_item_list.attribute.name;
        let maxvalue:number;
        maxvalue =  this.product_item_list.inventory.stock;
        this.maxvalue =  this.product_item_list.inventory.stock;
        $(".showerr").hide();
        $('.qtyplus').click(function (e) {
          // Stop acting like a button
          e.preventDefault();
          // Get the field name
          this.fieldName = $(this).attr('field');
          // Get its current value
          var currentVal = parseInt($('input[name=' + this.fieldName + ']').val());
          // If is not undefined
          if (!isNaN(currentVal)) {
            // Increment
            $('input[name=' + this.fieldName + ']').val(currentVal + 1);
            $(".showerr").hide();
          } else {
            // Otherwise put a 0 there
            $(".showerr").show();
            $('input[name=' + this.fieldName + ']').val(maxvalue);

          }
    
        });
        // This button will decrement the value till 0
        $(".qtyminus").click(function (e) {
          $(".showerr").hide();
          // Stop acting like a button
          e.preventDefault();
          // Get the field name
          this.fieldName = $(this).attr('field');
          // Get its current value
          var currentVal = parseInt($('input[name=' + this.fieldName + ']').val());
          // If it isn't undefined or its greater than 0
          if (!isNaN(currentVal) && currentVal > 1) {
            // Decrement one
            $('input[name=' + this.fieldName + ']').val(currentVal - 1);
          } else {
            // Otherwise put a 0 there
            $('input[name=' + this.fieldName + ']').val(1);
          }
    
    
        });
       }
      else {
        alert("error")
      }
    })
  }
  
  // addCart() {
  //   this.text_value = $('.qty').val();
  //   console.log(this.text_value)
  //   this.total_amnt = this.text_value * (this.produtsPrice.splPrice)
  //   LocalStorage.setValue('totalItems',this.text_value);
  //   LocalStorage.setValue('totalAmount',this.total_amnt);
  //   if(LocalStorage.getValue('cusid')!=undefined){
  //     this.cutomerId = LocalStorage.getValue('cusid')
  //   }
  //   console.log(this.total_amnt)
  //   this.server.post("salesquote", { "isActive": 1, "customerId":  2, "websiteId": 1, "currency": "AED", "totalItems": this.text_value, "totalItemsQty": this.text_value, "grandTotal": this.total_amnt, "shippingAmount": 100, "taxAmount": 200, "couponCode": "CD", "codCharges": 100, "paymentMethod": "Cash" })
  //     .then((data) => {
  //       console.log(data)
  //       if (data.status == 200) {
  //         this.salesItems = data.result;
  //         LocalStorage.setValue('salesItems', this.salesItems)
  //         this.quoteItems();
  //       }
  //       else {

  //       }
  //     })
    
  // }
  // quoteItems() {
  //   this.server.post("salesquoteitems", {"quoteId": this.salesItems.id,"productId": this.productItem.productId,"productName": this.productItem.name,"price": this.produtsPrice.splPrice,"cost": this.produtsPrice.price,"sku": this.productList.sku,"productType": this.productTypeList.type })
  //   .then((data) => {
  //     console.log(data)
  //     if (data.status == 200) {
  //       this.salesQuoteItems = data.result;
  //       LocalStorage.setValue('salesQuoteItems', this.salesQuoteItems)
  //       this.router.navigateByUrl('cart')
  //     }
  //     else {

  //     }
  //   })
  // }
  addCart() {
    this.text_value = $('.qty').val();
    LocalStorage.setValue('productIndex',this.product_item_list.attribute.productId);
    LocalStorage.setValue('totalItems',this.text_value);
    if(LocalStorage.getValue('loggedIn')!=undefined){
      if(LocalStorage.getValue('loggedIn')){
        this.router.navigateByUrl('cart')
      }else{
        this.router.navigateByUrl('login')
      }
    }else{
      this.router.navigateByUrl('login')
    }
  }
}
