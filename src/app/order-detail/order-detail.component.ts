import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { LocalStorage } from '../core/services/local_storage.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  constructor(private router: Router,private customs: CustomScript) {
    this.customs.loadScript()
   }

  ngOnInit() {
    
  }

}
