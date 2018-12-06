import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
import { CONFIG } from '../config'; 
declare var $: any;

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  subscribe: any;
  categoryid: number;
  catProductList:any=[];
  realteProductList:any;
  cat_name:string=''
  constructor(private route: ActivatedRoute,private router: Router,private customs: CustomScript, private server: HyperService) {
      this.customs.loadScript()
      this.subscribe = this.route.params.subscribe(params => {
        this.categoryid = params['id'];
    });
  }
  

  ngOnInit() {
    if(LocalStorage.getValue!=undefined){
      this.cat_name=LocalStorage.getValue('clicked_category_name')
    }
    
    this.categoryProducts();
  }
  categoryProducts(){
    this.server.get("relatedproducts?categoryId="+this.categoryid)
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.catProductList = data.result;
        }
        else {

        }
      })
  }
  goToSingleProduct(list){
    // this.realteProductList.push(prodId)
    LocalStorage.setValue('relate_product_id', this.realteProductList)
    this.router.navigateByUrl('single-product/' + list.categoryId +'/'+  list.productId);
  }
}
