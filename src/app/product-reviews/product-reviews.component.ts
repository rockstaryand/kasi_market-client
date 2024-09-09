import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/products';
import { ProductService } from '../product.service';
import { Reviews } from '../models/reviews';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-product-reviews',
  templateUrl: './product-reviews.component.html',
  styleUrls: ['./product-reviews.component.scss'],
})
export class ProductReviewsComponent implements OnInit {
  products: Product[] = [];
  @Input() productId: number = 0;
  reviews: Reviews[] = [];

  newReview: Reviews = {
    id: 0,
    product_id: 0,
    rating: 1,
    comment: '',
  };
  showAddReview = false;

  constructor(
    private route: ActivatedRoute,
    private reviewsService: ProductService,
    private storage: Storage
  ) {}

  async ngOnInit() {
    this.getReviews();
    await this.storage.create();
  }

  getReviews() {
    this.reviewsService
      .getProductReviews(this.productId)
      .subscribe((reviews) => {
        this.newReview = reviews;
        console.log(this.newReview);
      });
  }

  addReview() {
    this.newReview.product_id = this.productId;
    this.reviewsService
      .addReview(this.newReview, this.productId)
      .subscribe(() => {
        this.getReviews();
        this.showAddReview = false;
        this.newReview = {
          id: 0,
          product_id: 0,
          rating: 1,
          comment: '',
        };
      });
  }
}
