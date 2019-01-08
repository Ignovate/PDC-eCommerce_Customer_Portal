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
// Shared Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
// Component
import { LandingComponent } from './landing/landing.component';
import { CategoryComponent } from './category/category.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './cart/checkout.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { CustomerProfileComponent } from './customer/profile.component';
import { CustomerAddressComponent } from './customer/address.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { TermsOfUseComponent } from './terms-of-use/terms-of-use.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ReturnExchangeComponent } from './return-exchange/return-exchange.component';
import { ShipDeliveryComponent } from './ship-delivery/ship-delivery.component';
import { StoreLocatorComponent } from './store-locator/store-locator.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './product/products.component';
import { masterService } from '../app/core/services/master.service';
// import { Ng4FilesModule } from 'angular4-files-upload';
// import { FileDropModule } from 'ngx-file-drop';

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("219022572308304")
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
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    CategoryComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    RegistrationComponent,
    OrderDetailComponent,
    OrderHistoryComponent,
    CustomerProfileComponent,
    CustomerAddressComponent,
    AboutComponent,
    ContactUsComponent,
    TermsOfUseComponent,
    ComingSoonComponent,
    PrivacyComponent,
    ReturnExchangeComponent,
    ShipDeliveryComponent,
    StoreLocatorComponent,
    ProductComponent,
    ProductsComponent
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
  providers: [HyperService, AuthGuardService,masterService, CustomScript,{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
