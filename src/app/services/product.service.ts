import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Product } from '../models/products';
import { Observable } from 'rxjs';
import { Reviews } from '../models/reviews';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl.products;
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.apiUrl);
  }

  getProductById(productId: string | null): Observable<Product> {
    const url = `${this.apiUrl}/${productId}`;
    return this.http.get<Product>(url);
  }

  getProductReviews(productId: number): Observable<Reviews> {
    const url = `${this.apiUrl}/${productId}/reviews`;
    return this.http.get<Reviews>(url);
  }
  addReview(review: Reviews, productId: number): Observable<Reviews> {
    const url = `${this.apiUrl}/${productId}/reviews`;
    return this.http.post<Reviews>(url, review);
  }
}
