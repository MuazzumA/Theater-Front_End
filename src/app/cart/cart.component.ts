import { Component, OnInit } from '@angular/core';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardPaymentComponent } from "../card-payment/card-payment.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, CardPaymentComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService, private router: Router) {}

  showCardDetails = false;

  cart: any[] = [];
  message: string | null = null;
  totalPrice: number = 0;

  ngOnInit(): void {
    this.loadDummyCart(); // Use dummy data
  }

  // Method to load dummy data for testing purposes
  loadDummyCart(): void {
    this.cart = [
      {
        id: 1,
        name: 'Movie Ticket',
        price: 10,
        quantity: 2,
        imageUrl: 'https://th.bing.com/th/id/OIP.1jdklJKgjAe81COtBdjG9AHaLH?rs=1&pid=ImgDetMain' // Ticket Image URL
      },
      {
        id: 2,
        name: 'Soda',
        price: 5,
        quantity: 1,
        imageUrl: 'https://i5.walmartimages.com/asr/7b673a21-d6e8-4445-a32c-afdcda21b4d8_1.97ecaa927b4f963cee1f015aeadced8a.jpeg' // Soda Image URL
      }
    ];
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  incrementItem(itemId: number): void {
    this.cartService.incrementItem(itemId);
    this.loadCart(); // Refresh the cart after changes
  }

  decrementItem(itemId: number): void {
    this.cartService.decrementItem(itemId);
    this.loadCart(); // Refresh the cart after changes
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId);
    this.loadCart(); // Refresh the cart after changes
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.loadCart();
  }

  handleCheckOut(): void {
    this.showCardDetails = true;
    this.message = "You need to login before you can place an order";
  
  }

  // Method to simulate cart load (for testing purpose)
  loadCart(): void {
    this.cart = this.cartService.getCart();
    this.calculateTotalPrice();
  }
}
