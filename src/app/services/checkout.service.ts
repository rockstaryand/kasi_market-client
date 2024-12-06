import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private payFastUrl = 'https://sandbox.payfast.co.za/eng/process';
  private merchantId = '10000100';
  private merchantKey = '46f0cd694581a';

  constructor(private http: HttpClient) {}

  processPayment(
    amount: number,
    name: string,
    cardNumber: string,
    expDate: string,
    cvv: string
  ): Promise<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
      }),
    };

    const requestData = {
      merchant_id: this.merchantId,
      merchant_key: this.merchantKey,
      amount: amount.toFixed(2),
      item_name: 'Kasi Market Purchase',
      return_url: 'http://localhost:8100/success',
      cancel_url: 'http://localhost:8100/cancel',
      name_first: name,
      email_address: 'test@example.com',
      m_payment_id: '12345',
      card_no: cardNumber,
      exp_date: expDate,
      cvv: cvv,
    };

    const encodedData = new URLSearchParams(requestData).toString();

    return this.http
      .post(this.payFastUrl, encodedData, httpOptions)
      .toPromise()
      .then((response) => {
        // Handle success response here, e.g. update order status in database
        return true;
      })
      .catch((error) => {
        // Handle error here, e.g. display error message to user
        console.error('Error processing payment:', error);
        return false;
      });
  }
}
