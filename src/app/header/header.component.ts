import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { CustomScript } from '../core/services/custom-script';
import { HyperService } from '../core/services/http.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocalStorage } from '../core/services/local_storage.service';
import { CONFIG } from '../config'; 
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn:boolean = false;
  showmenu:boolean =false;
  _url:any;
  cat_name:string=''
  categoryList:any=[];
  constructor(private router: Router, private server: HyperService) {
    this.loggedIn = CONFIG._loggedIn
    this._url = this.router.url.split("/");
    this.showmenu = CONFIG.showmenu;
  }

  ngOnInit() {
    if(this._url[1]=='login' || this._url[1]=='registration'){
      this.loggedIn =false;
    }
    this.getCategories();
  }
  viewCategory() {
    this.router.navigateByUrl('category')
  }
  ////////////////////////////// Category List ///////////////////////////////
  getCategories(){
    this.server.get("menu")
      .then((data) => {
        console.log(data)
        if (data.status == 200) {
          this.categoryList = data.result;
        }
        else {

        }
      })
  }
  /////////////////////// Category Products /////////////////////////////////////////
  goToCategory(id,list){
    LocalStorage.setValue('clicked_category_name', list.categoryName)
    this.router.navigateByUrl('category/' + id);
  }
}
