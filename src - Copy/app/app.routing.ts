//common//
import { NgModule }  from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
//Pages//
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

export const routes: Routes = [
   { path: '', component: LandingComponent },
   { path: 'login', component: LoginComponent },
   { path: 'registration', component: RegistrationComponent },
   { path: 'category', component: CategoryComponent },
   { path: 'cart', component: CartComponent },
   { path: 'checkout', component: CheckoutComponent },
   { path: 'order-detail', component: OrderDetailComponent },
   { path: 'order-history', component: OrderHistoryComponent },
   { path: 'customer-profile', component: CustomerProfileComponent },
   { path: 'customer-address', component: CustomerAddressComponent },
   { path: 'about', component: AboutComponent },
   { path: 'contact-us', component: ContactUsComponent },
   { path: 'terms', component: TermsOfUseComponent },
   { path: 'coming-soon', component: ComingSoonComponent },
   { path: 'privacy', component: PrivacyComponent },
   { path: 'return-exchange', component: ReturnExchangeComponent },
   { path: 'ship-delivery', component: ShipDeliveryComponent },
   { path: 'store-locator', component: StoreLocatorComponent },
   { path: 'product/:catid/:id', component: ProductComponent },
   { path: 'products/:id', component: ProductsComponent }
   
]
@NgModule({
imports: [ RouterModule.forRoot(routes) ],
exports: [ RouterModule ]
})

export class AppRoutingModule {}