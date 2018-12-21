import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { HyperService } from '../app/core/services/http.service';
import { AuthGuardService } from '../app/core/services/auth-guard.service';

//Modules
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 
import { OwlModule } from 'ngx-owl-carousel';
import {SlideshowModule} from 'ng-simple-slideshow';
import { Ng2CompleterModule } from "ng2-completer";
declare var $: any;
import { CustomScript } from '../app/core/services/custom-script';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";

import { routes } from './app.routing';
import { AboutComponent } from './about/about.component';
 

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SharedComponent } from './shared/shared.component';
import { LayoutComponent } from './layout/layout.component';
import { ProductComponent } from './product/product.component';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ReturnExchangeComponent } from './return-exchange/return-exchange.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ShipDeliveryComponent } from './ship-delivery/ship-delivery.component';
import { StoreLocatorComponent } from './store-locator/store-locator.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
// import { Ng4FilesModule } from 'angular4-files-upload';
// import { FileDropModule } from 'ngx-file-drop';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("Your-Facebook-app-id")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("129589406150-ibumfj7e47ql1js28fjn3pq3ldeo0voa.apps.googleusercontent.com")
        },
         
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LandingComponent,
    SharedComponent,
    LayoutComponent,
    ProductComponent,
    UserComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
    SingleProductComponent,
    CartComponent,
    LoginComponent,
    RegistrationComponent,
    CheckoutComponent,
    ChangeAddressComponent,
    OrderDetailComponent,
    OrderHistoryComponent,
    SubCategoryComponent,
    MyProfileComponent,
    ContactUsComponent,
    ReturnExchangeComponent,
    PrivacyComponent,
    ShipDeliveryComponent,
    StoreLocatorComponent,
    TermsOfUseComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlModule,
    SlideshowModule,
    Ng2CompleterModule,
    SocialLoginModule,
    NgbModule.forRoot(),
    // Ng4FilesModule ,
    RouterModule.forRoot(routes, {
      useHash: true
    }),
  ],
  providers: [HyperService, AuthGuardService, CustomScript,{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
