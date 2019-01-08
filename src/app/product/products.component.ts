import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HyperService } from '../core/services/http.service';
import { CustomScript } from '../core/services/custom-script';
import { LocalStore } from '../store/local-store';
import { Util } from '../util/util';
import { LocalStorage } from '../core/services/local_storage.service';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  subscribe: any;
  categoryId: number;
  catProductList:any=[];
  realteProductList:any;
  cat_name:string='';
  bread_crumb:any=[];
  input:any;
  sortType:string='asc';

  constructor(private router: Router,
    private activatedroute:ActivatedRoute,
    private customs: CustomScript,
    private server: HyperService) {
      this.customs.loadScript();
    //   this.subscribe = this.activatedroute.params.subscribe(params => {
    //     this.categoryid = params['id'];
    // });
    // console.log(this.categoryid);
  }

  ngOnInit() {
    
    this.activatedroute.params.subscribe(
      params => {
        this.categoryId = params['id'];
        this.searchProducts(this.categoryId, this.categoryId);
        this.input = LocalStore.getAndRemove("products");
        console.log("products:input", this.input);
        if(this.input) {
          this.cat_name = this.input.name;
          // this.categoryId = this.input.value;
          
          this.searchProducts(this.input.key, this.categoryId);
          this.getBreadcrumb();
        } else {
          console.log("input not available");
        }
    });
    // this.input = LocalStore.getAndRemove("products");
    // console.log("products:input", this.input);
    // if(this.input) {
    //   this.cat_name = this.input.name;
    //   this.categoryId = this.input.value;
    //   this.searchProducts(this.input.key, this.input.value);
    // } else {
    //   console.log("input not available");
    // }
    // this.activatedroute.queryParams.subscribe((params:any) => {
    //   console.log("products params", params);
    //   this.cat_name = params["name"];
    //   this.categoryid = params["value"];
    //   this.searchProducts(params["key"], params["value"]);
    // });
    // this.getBreadcrumb();
  }

  searchProducts(key, value){
    this.server.get("product/search?"+key+"="+value)
      .then((data) => {
        console.log("products", data);
        if (data.status == 200) {
          this.catProductList = data.result;
          this.onChangeSortType(this.sortType);
        }
        else {

        }
      });
  }

  goToSingleProduct(product){
    // this.router.navigateByUrl('single-product/' + product.categoryId +'/'+  product.productId);
    // LocalStore.add('relate_product_id', this.realteProductList);
    // LocalStore.add("product", Util.getProductParam(product.categoryId, product.productId));
    // this.router.navigateByUrl("product/"+product.productId);
    this.router.navigateByUrl("product/"+product.categoryId+"/"+product.productId);
  }

  getBreadcrumb(){
    this.server.get("breadcrumb?categoryId="+this.categoryId)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          console.log('bread crumb',data.result)
          this.bread_crumb=data.result;
        }
        else {

        }
      });
  }
  goToCategory(id,name) {
    LocalStore.add("products", Util.getProductsParam("categoryId", id,name));
    LocalStorage.setValue("products",id)
    this.router.navigateByUrl("products/"+id);
  }
  clickedBreadcrumb(id){
    this.router.navigateByUrl('products/' + id);
  }
  onChangeSortType(value){
    this.server.get("product/search?categoryId="+this.categoryId+"&sort="+this.sortType+"&page=1&pageSize=10")
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        console.log('bread crumb',data.result)
        this.catProductList=data.result;
      }
      else {

      }
    });
  }
}
