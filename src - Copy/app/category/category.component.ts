import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { LocalStore } from '../store/local-store';
import { Util } from '../util/util';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  subscribe: any;
  categoryid: number;
  constructor(private route: ActivatedRoute,private router: Router,private customs: CustomScript) {
      this.customs.loadScript()
      this.subscribe = this.route.params.subscribe(params => {
        this.categoryid = params['id'];
    });
  }

  ngOnInit() {
   
  }
 
  product(productId, categoryId) {
    LocalStore.add("product", Util.getProductParam(categoryId, productId));
    this.router.navigateByUrl("product/"+productId);
  }
}
