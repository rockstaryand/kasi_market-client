import { Component, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store-sevice.service';
import { Stores } from '../models/stores';


@Component({
  selector: 'app-storefront',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  storeProducts: Product[] = [];
  store: Stores = {
    id: 0,
    name: '',
    address: '',
    email: '',
    phone: 0
  };

  constructor(private storeService: StoreService, private productService: ProductService, private route: ActivatedRoute) {
   
  }

  ngOnInit() {
    const storeId = this.route.snapshot.paramMap.get('id');
    this.getStoreById(storeId);
    this.getProductsInStore(storeId);
  }

  getStoreById(storeId: string | null) {

    this.storeService.getStoreById(storeId).subscribe((store) => {
      this.store = store;

    });
  }

  getProductsInStore(id: string | null) {
    this.productService.getProductById(id).subscribe((product) => {
      this.storeProducts.push(product);
      if (!this.storeProducts) {
        console.error(`Product with id ${id} not found.`);
        return;
      }
    })
  }
}
