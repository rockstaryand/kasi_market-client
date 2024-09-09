import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FavoritesService } from '../favorite.service';
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
  availableColors: string[] = ['red', 'blue', 'black'];
  products: Product[] = [];
  selectCategory: string[] = ['All', 'Jackets', 'Pants', 'Headwear', 'Bags'];
  selectedColor: string = '';
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService // private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id, '??');
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
      console.log(this.product, 'product');
      if (!this.product) {
        console.error(`Product with id ${id} not found.`);
        return;
      }
    });
    // let prodId = parseInt(id || '');
    // this.favoritesService.getFavorites().subscribe((favorites) => {
    //   this.isFavorite = this.favoritesService.isFavorite(prodId);
    // });
  }

  onColorSelect(color: string) {
    // Update the product information with the selected color

    for (let col of this.selectedColor) {
      color = col;
      console.log(this.product.color);

      // If necessary, update the product image to reflect the selected color
      if (color === 'red') {
        console.log('red');
      } else if (color === 'green') {
        console.log('green');
      } else if (color === 'blue') {
        console.log('blue');
      }
    }
  }

  selectedCategory(category: string) {
    for (let cat of this.selectCategory) {
      cat = category;

      this.products =
        cat === 'All'
          ? this.products
          : this.products.filter((p) => p.category === cat);
      console.log(this.products, 'at this point');
    }
    return this.products;
    // this.selectCategory[i] = category;
  }

  // toggleFavorite() {
  //   this.isFavorite = !this.isFavorite;
  //   this.favoritesService.toggleFavorite(this.product.id);
  // }
}
