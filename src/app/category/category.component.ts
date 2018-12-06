import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { LocalStorage } from '../core/services/local_storage.service';
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
 
  product(id,catid) {
    LocalStorage.setValue('product_id', id)
    LocalStorage.setValue('category_id', catid)
    
    this.router.navigateByUrl('single-product')
  }
}
