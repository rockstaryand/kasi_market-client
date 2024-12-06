import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductComponent } from './product/product.component';
import { AccountPage } from './account/account.page';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { ProductReviewsComponent } from './product-reviews/product-reviews.component';
import { StoreComponent } from './store/store.component';
// import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    AccountPage,
    CartModalComponent,
    ProductReviewsComponent,
    StoreComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    // IonicStorageModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SwiperModule,
    FormsModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
