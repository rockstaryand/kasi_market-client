import { Component, OnInit } from '@angular/core';

declare var Stripe: (arg0: string) => any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {

  stripe: any;
  
  constructor() {}

  ngOnInit() {       
    // Initialize Stripe with your public key
    const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
    const elements = stripe.elements();

    // Create an instance of the card Element.
    const card = elements.create('card');

    // Add an instance of the card Element into the `card-element` div.
    card.mount('#card-element');

    const form = document.getElementById('payment-form');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      const { token, error } = await stripe.createToken(card);

      if (error) {
        // Display error to the user.
        const errorElement = document.getElementById('card-errors');
        errorElement!.textContent = error.message;
      } else {
        // Send the token to your server.
        this.sendTokenToServer(token);
      }
    });
  }

  async sendTokenToServer(token: any) {
    // Send the token to your Express.js backend for processing.
    const response = await fetch('YOUR_BACKEND_URL/charge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: token.id, amount: 1000 }), // Adjust the amount as needed.
    });

    if (response.ok) {
      // Payment successful, show confirmation message or navigate to a success page.
      console.log('Payment successful');
    } else {
      // Payment failed, handle the error.
      console.error('Payment failed');
    }
  }
}
