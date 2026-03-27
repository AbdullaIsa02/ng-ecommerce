import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcommerceStore } from '../../ecommerce-store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div *ngIf="product; else notFound">
      <h1 class="text-3xl font-bold mb-4">{{ product.name }}</h1>
      <img [src]="product.imageUrl" alt="{{ product.name }}" class="w-full max-h-[400px] mb-4 rounded-xl" />
      <p class="text-gray-700 mb-4">{{ product.description }}</p>
      <div class="text-2xl font-bold mb-2">{{ '$' + product.price }}</div>
      <div class="text-sm text-gray-500 mb-6">{{ product.inStock ? 'In Stock' : 'Out of Stock' }}</div>
      <button mat-raised-button color="primary" (click)="addToCart()">
        <mat-icon>shopping_cart</mat-icon>
        Add to Cart
      </button>
    </div>

    <ng-template #notFound>
      <div class="text-center text-gray-500 mt-20">Product not found.</div>
    </ng-template>
  `
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private store = inject(EcommerceStore);

  product: any;

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('productId'); // ⚡ правильное имя
    this.product = this.store.products().find(p => p.id === productId);
  }

  addToCart() {
    if (this.product) this.store.addToCart(this.product);
  }
}