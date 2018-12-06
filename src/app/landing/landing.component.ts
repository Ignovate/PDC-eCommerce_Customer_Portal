import { Component, OnInit } from '@angular/core';
import { HyperService } from '../core/services/http.service';
import { CustomScript } from '../core/services/custom-script';
import { CONFIG } from '../../app/config';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel';
declare var $:any;
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  // categoryList:any=[];
  // category_id:any;
  // topBannerList:any=[];
  
  main_list:any;
  banner_list:any=[];
  exclusive_list:any=[];
  amazing_list:any=[];
  wish_list:any=[];
  trending_list:any=[];
  whats_new_list:any=[];
  top_selling_list:any=[];
  top_selling_images_arr:any=[];
  wishlist_images_arr:any=[];
  mySlideImages = [1,2,3].map((i)=> `https://picsum.photos/640/480?image=${i}`);
  myCarouselImages = [1,2,3,4,5,6].map((i)=> `https://picsum.photos/640/480?image=${i}`);
  mySlideOptions={items: 1, dots: false, nav: true};
  myCarouselOptions={items:3, dots: false, nav: true};
  exclusideSlides:any;
  exclusivelOptions:any;
  amazeImages:any;
  amazeOptions={items: 5, dots: false, nav: true};
  myCarouselTopOptions={items: 4, dots: false, nav: true};
  wishlistOptions={items: 3, dots: false, nav: true};
  
  constructor(private server: HyperService, private customs: CustomScript) { 
   
    this.customs.loadScript()
    CONFIG.showmenu =true;
  }
 
  ngOnInit() {
    this.getLandingBanner();
    this.getTopSelling();
    this.getWhislistList();
    // this.getCategoryBanner();
    // $('.owl-carousel').owlCarousel();
  }
  // getCategoryBanner(){
  //   this.server.getbanner("getcategoryhierarchylist")
  //     .then((data) => {
  //         if (data.status == 200) {
  //            console.log(data)
  //            this.categoryList = data.result.responseValue.gaiaresponse.categoryList;
  //            this.topBannerList = data.result.responseValue.gaiaresponse[1];
  //            console.log(this.topBannerList);
  //            //console.log(this.categoryList)
  //           //  for(let i=0;i<this.categoryList.length;i++){
  //           //     this.category_id =  this.categoryList[i].categoryid;
  //           //     this.bannerList = data.result.responseValue.gaiaresponse[this.category_id];
  //           //     for(var key in this.bannerList){
                   
  //           //       if(this.category_id == 1){
  //           //         this.topBannerList = this.bannerList[key];
  //           //         console.log(this.topBannerList);
  //           //       }
   
  //           //     }
  //           //  }
  //         } else  {
  //         }

          
  //     });
  // }
  trend_images:any=[];
  whats_new_images:any=[];
  url_1:string=''
  getLandingBanner(){
    this.server.get("banners")
    .then((data) => {
        if (data.status == 200) {
           console.log(data.result,"data")
           this.main_list=data.result;
           this.banner_list=this.main_list[0].bannerImages;
          //  this.myCarouselImages = this.banner_list;
           this.exclusive_list=this.main_list[1].bannerImages;
           this.exclusideSlides = this.exclusive_list;
           this.exclusivelOptions = {items:3, dots: false, nav: true};
           this.amazing_list=this.main_list[2].bannerImages;
           this.amazeImages = this.amazing_list;
          //  this.wish_list=this.main_list[3].bannerImages;
           this.trending_list=this.main_list[3].bannerImages;
           this.whats_new_list=this.main_list[4].bannerImages;
          //  this.top_selling_list=this.main_list[8].bannerImages;
           this.url_1=this.trending_list[0].imageUrl;
           for(let i=0;i<this.trending_list.length;i++){
              this.trend_images[i]=this.trending_list[i].imageUrl;
           }
           for(let i=0;i<this.whats_new_list.length;i++){
            this.whats_new_images[i]=this.whats_new_list[i].imageUrl;
          }
           console.log()
        } else  {

        }
    });
  }
  getTopSelling(){
    let top_selling_images:any=[];
    this.server.get("relatedproducts?categoryId="+23)
    .then((data) => {
        if (data.status == 200) {
          this.top_selling_list=data.result;
           console.log(data.result)
           this.top_selling_list.forEach(function (item, index) {
            console.log(item)
            top_selling_images.push(item.imageUrl)
           })
           this.top_selling_images_arr = top_selling_images
           console.log(top_selling_images)
        } else  {

        }
    });
  }
  getWhislistList(){
    let wish_list_images:any=[];
    this.server.get("relatedproducts?categoryId="+22)
    .then((data) => {
        if (data.status == 200) {
          this.wish_list=data.result;
           console.log(data.result)
           this.wish_list.forEach(function (item, index) {
            console.log(item)
            wish_list_images.push(item.imageUrl)
           })
           this.wishlist_images_arr = wish_list_images
        } else  {

        }
    });
  }
}
