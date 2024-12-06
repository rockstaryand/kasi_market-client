import {
  Component,
  OnInit,
  AfterContentChecked,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/products';
import { Router, NavigationExtras } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import SwiperCore, { Pagination, EffectCube } from 'swiper';
import { IonRouterOutlet, NavController } from '@ionic/angular';

// import { ProductComponent } from '../product/product.component';

SwiperCore.use([Pagination, EffectCube]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterContentChecked {
  @ViewChild('swiper')
  swiper!: SwiperComponent;
  products: Product[] = [];
  cartItemCount: number = 0;
  cartTotal: number = 0;
  cartItems: any[] = [];
  selectCategory: string = 'All';
  filteredProducts: Product[] = [];

  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 50,
    pagination: true,
  };

  constructor(
    private modalController: ModalController,
    private productService: ProductService,
    private router: Router,
    private navController: NavController,
    private cartService: CartService,
    private ionRouterOutlet: IonRouterOutlet
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
      const shuffledArray = this.shuffleArray(data);
    });
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  // getRandomObjectFromArray<T>(array: T[]): T {
  //   const randomIndex = Math.floor(Math.random() * array.length);
  //   return array[randomIndex];
  // }

  ngAfterContentChecked(): void {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  viewProduct(product: Product) {
    let navigationExtras: NavigationExtras = {
      state: {
        product: product,
      },
    };

    if (navigationExtras.state) {
      this.navController.navigateForward(
        `product/${navigationExtras.state['product'].id}`,
        navigationExtras
      );
    }
  }

  openProfilePage() {
    this.navController.navigateForward('/account');
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.cartItemCount = this.cartService.getItems().length;
  }
  selectedCategory(category: string) {
    this.selectCategory = category;
    this.filteredProducts =
      this.selectCategory === 'All'
        ? this.products
        : this.products.filter((p) => p.category === this.selectCategory);
  }

  async openCartModal() {
    this.cartItems = this.cartService.getItems();
    this.cartTotal = this.cartService.getTotal();
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: {
        cartItems: this.cartItems,
        cartTotal: this.cartTotal,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data && data.data && data.data.updatedCartItemCount !== undefined) {
        this.cartItemCount = data.data.updatedCartItemCount;
      
      }
    });
    return await modal.present();
  }

}
