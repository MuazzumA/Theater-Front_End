import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { error } from 'console';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-payment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './card-payment.component.html',
  styleUrl: './card-payment.component.css'
})
export class CardPaymentComponent {
  @Input() total!: number;

  paymentModel = {
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    amount: ''
  };

  constructor(private http: HttpClient){}
  

  onSubmit(){
    this.http.post('/processPayment', this.paymentModel)
      .subscribe(response => {
        //handle response from server
        console.log('Payment successfully processed', response);
      }, error => {
        console.log('Payment failed processing', error);
      });
  }

}
