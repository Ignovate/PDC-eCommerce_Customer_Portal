import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import * as moment from 'moment';
import { LocalStore } from '../store/local-store';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  
  salesOrderList:any=[];
  salesOrderDate:any=[];
  userData:any=[];
  dateFormat:any;
  delivered_date:any;
  
  constructor(private router: Router,
    private customs: CustomScript,
    private server: HyperService) { 
    this.customs.loadScript()
  }

  ngOnInit() {
    // this.userData = (LocalStorage.getValue('userData') != undefined) ? LocalStorage.getValue('userData') : [];
    this.userData = LocalStore.getJson("user");
   console.log(this.userData);
    // this.getOrderList();
    if(LocalStore.get("loggedIn")) {
      this.getOrderList(LocalStore.get("userId"));
    } else {
      this.router.navigateByUrl('login');
    }  
  }

  getOrderList(userId){
    this.server.get("salesorders/"+userId)
    .then((data) => {
      console.log(data)
      if (data.status == 200) {
        this.salesOrderList = data.result;
        for(let i=0;i<this.salesOrderList.length;i++){
          let obj:any={};
          obj.year_data = this.salesOrderList[i].createdDate[0];
          obj.month_data = this.salesOrderList[i].createdDate[1];
          obj.date_data = this.salesOrderList[i].createdDate[2];
          this.salesOrderDate.push(obj)
        }
        console.log(this.salesOrderDate)
        for(let j=0;j<this.salesOrderDate.length;j++){
          this.salesOrderList[j].delivered=''
          this.dateFormat = this.salesOrderDate[j].year_data+'-'+this.salesOrderDate[j].month_data+'-'+this.salesOrderDate[j].date_data;
          this.delivered_date = moment(this.dateFormat, "YYYY-MM-DD").format("DD MMMM YYYY");
         this.salesOrderList[j].delivered = this.delivered_date
         console.log(this.salesOrderList)
        }
      }
      else {

      }
    });
  }

  goToDetail(){
    this.router.navigateByUrl('order-detail')
  }
  
}
