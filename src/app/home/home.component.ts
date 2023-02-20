import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../models/products';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;
    });
  }
  viewProduct(productId: number) {
    let navigationExtras: NavigationExtras = {
      state: {
        id: productId
      }
    };
    this.router.navigate(['product'], navigationExtras);
  }

}
