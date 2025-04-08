import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Product } from '../models/products';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  @Input() cartItems: Product[] = [];
  @Input() cartTotal: number = 0;

  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  // Load cart items from the backend and update the total
  loadCartItems() {
    this.cartService.getCartItems().subscribe(cartItems => {
      this.cartItems = cartItems;
      this.cartService.setCartItems(cartItems);  // Manually update the service with the fetched cart
    });
  }

  // Remove an item from the cart
  async removeItem(item: Product) {
    this.cartService.removeItemFromCart(item.id).subscribe(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.id !== item.id);
      this.cartService.setCartItems(this.cartItems); // Update service and recalculate total
    });
  }

  // Update cart total from the cart service
  updateCartTotal() {
    this.cartService.getCartTotal().subscribe((total) => {
      this.cartTotal = total;
    });
  }

  // Checkout process, navigate to checkout page
  checkout() {
    this.navController.navigateForward('/checkout');
  }

  // Dismiss the modal and pass back the updated cart count
  async dismissModal() {
    await this.modalController.dismiss({
      updatedCartItemCount: this.cartItems.length
    });
  }
}
