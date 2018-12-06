import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { LocalStorage } from '../core/services/local_storage.service';
import { HyperService } from '../core/services/http.service';
@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  salesOrderList:any=[];
  userData:any=[];
  constructor(private router: Router,private customs: CustomScript, private server: HyperService) { 
    this.customs.loadScript()
  }

  ngOnInit() {
    this.userData = (LocalStorage.getValue('userData') != undefined) ? LocalStorage.getValue('userData') : [];
    this.getOrderList();
  }
  getOrderList(){
    this.server.get("salesorders/"+24)
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        this.salesOrderList = data.result;
      }
      else {

      }
    })
  }
  goToDetail(){
    this.router.navigateByUrl('order-detail')
  }
}
