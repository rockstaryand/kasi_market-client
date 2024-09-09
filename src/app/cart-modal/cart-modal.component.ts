import { Component, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Product } from '../models/products';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent {
  @Input() cartItems: Product[] = [];
  @Input() cartTotal: number = 0;

  constructor(
    private modalController: ModalController,
    private navController: NavController,
    private cartService: CartService
  ) {}

  removeItem(item: Product) {
    const index = this.cartItems.indexOf(item);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCartTotal();
    }
  }

  updateCartTotal() {
    this.cartTotal = this.cartService.getTotal();
  }

  checkout() {
    this.navController.navigateForward('/checkout');
  }

  async dismissModal() {
    await this.modalController.dismiss({
      updatedCartItemCount: this.cartItems.length
    });
  }
}
