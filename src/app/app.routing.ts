//common//
import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
//Pages//
import { LandingComponent } from './landing/landing.component';
import { AboutComponent } from './about/about.component';
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

export const routes: Routes = [
   { path: '', component: LandingComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registration', component: RegistrationComponent },
   { path: 'about', component: AboutComponent },
   { path: 'category', component: CategoryComponent },
   { path: 'category/:id', component: SubCategoryComponent },
   { path: 'single-product/:catid/:id', component: SingleProductComponent },
   { path: 'cart', component: CartComponent },
   { path: 'checkout', component: CheckoutComponent },
   { path: 'change-address', component: ChangeAddressComponent },
   { path: 'order-detail', component: OrderDetailComponent },
   { path: 'order-history', component: OrderHistoryComponent },
   { path: 'profile', component: MyProfileComponent },
   { path: 'contact-us', component: ContactUsComponent },
   { path: 'return-exchange', component: ReturnExchangeComponent },
   { path: 'privacy', component: PrivacyComponent },
   { path: 'ship-delivery', component: ShipDeliveryComponent },
   { path: 'store-locator', component: StoreLocatorComponent },
   { path: 'terms', component: TermsOfUseComponent }
   
]
@NgModule({
imports: [ RouterModule.forRoot(routes) ],
exports: [ RouterModule ]
})

export class AppRoutingModule {}