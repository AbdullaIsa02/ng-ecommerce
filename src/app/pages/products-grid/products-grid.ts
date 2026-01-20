import { Component, computed, input, signal } from '@angular/core';
import {Product} from '../../models/product';
@Component({    
  selector: 'app-products-grid',
  imports: [],
  template: `
  <div class="bg-gray-100 p-6">
    <h1 class="text-2xl font-bold text-gray-900">{{category() }}</h1>
</div>

<div class="responsive-grid">
  @for (product of filteredProducts(); track product.id) {
    <div class="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden flex flex-col h-full">
      <img [src]="product.imageUrl" class="w-full h-[300px] object-cover rounded-t-xl"/>
  </div>
  }
</div>
  `,
  styles: ``,
})
export default class ProductsGrid {
  category = input<string>('all');
products = signal<Product[]>([ 
   //Electronics
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1518441902113-fc0f3b2a3d86',
    rating: 4.5,
    reviewCount: 6,
    instock: true,
    category: 'electronics',
  },
  {
    id: '2',
    name: 'Smart 4K TV',
    description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1593784991095-a205069470b6',
    rating: 4.6,
    reviewCount: 6,
      instock: true,
    category: 'electronics',
  },
  {
    id: '3',
    name: 'Professional Camera',
    description: 'Mirrorless digital camera with 4K video capabilities',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1519183071298-a2962be96c8c',
    rating: 4.4,
    reviewCount: 6,
     instock: true,
    category: 'electronics',
  },
  {
    id: '4',
    name: 'Classic Denim Jacket',
    description: 'Vintage-style denim jacket with modern fit',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f',
    rating: 4.2,
    reviewCount: 5,
     instock: true,
    category: 'fashion',
  },
  ]);

filteredProducts = computed(() =>
  this.products().filter((p)=> p.category===this.category().toLowerCase())
);
items: any;
}
