import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  private cartTotalSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private apiUrl = environment.apiUrl.cart;

  constructor(private http: HttpClient) { }

  // Get cart items from the backend
  getCartItems(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  // Get cart total from the backend
  getCartTotal(): Observable<number> {
    return this.cartTotalSubject.asObservable();
  }

  // Add item to the cart
  addItemToCart(product: Product, quantity: number = 1): Observable<any> {
    const payload = {
      product_id: product.id,
      quantity: quantity
    };
    return this.http.post(this.apiUrl, payload);
  }

  // Remove item from the cart
  removeItemFromCart(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  // Update item quantity in the cart
  updateItemQuantity(itemId: string, quantity: number): Observable<any> {
    const payload = { quantity };
    return this.http.put(`${this.apiUrl}/${itemId}`, payload);
  }

  // Calculate total price from the cart items
  updateCartTotal(cartItems: Product[]): void {
    let total = 0;
    cartItems.forEach(item => {
      total += item.price * item.quantity;
    });
    this.cartTotalSubject.next(total);
  }

  // Set cart items manually, used when fetching from the backend
  setCartItems(cartItems: Product[]): void {
    this.cartItemsSubject.next(cartItems);
    this.updateCartTotal(cartItems);
  }
}
