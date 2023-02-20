import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  // productId: string = 0;
  product: any;
  products: Product[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id, "??")
    this.product = this.products.find((p: any) => p.id === id);
    if (!this.product) {
      console.error(`Product with id ${id} not found.`);
      return;
    }
    console.log(id, "id")
  }

}
