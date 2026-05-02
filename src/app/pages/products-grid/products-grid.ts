import { Component, computed, inject, input, signal, TrackByFunction } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { MatSidenavContainer, MatSidenavContent, MatSidenav } from '@angular/material/sidenav';
import { MatNavList, MatListItem } from '@angular/material/list';
import { RouterLink, RouterModule } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EcommerceStore } from '../../ecommerce-store';
import { ToggleWishlistButton } from '../../components/toggle-wishlist-button/toggle-wishlist-button';
import { effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-products-grid',
  standalone: true,

  imports: [
    ProductCard,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    MatNavList,
    MatListItem,
    RouterModule,
    TitleCasePipe,
    ToggleWishlistButton,
  ],

  template: `
    <mat-sidenav-container>
   <mat-sidenav mode="side" [opened]="store.categoriesOpen()">
        <div class="p-6">
          <h2 class="text-lg text-gray-900">Categories</h2>

          <mat-nav-list>
           @for (cat of categories; track cat.value) {
  <mat-list-item
    [activated]="cat.value === categoryValue()"
    class="my-2"
    [routerLink]="['/products', cat.value]"
  >
    <span
      matListItemTitle
      class="font-medium"
      [class]="cat.value === categoryValue() ? '!text-white' : null"
    >
      {{ cat.label }}
    </span>
  </mat-list-item>
}
          </mat-nav-list>
        </div>
      </mat-sidenav>
      <mat-sidenav-content class="bg-gray100 p-6 h-full">
        <h1 class="text-2xl font-bold text-gray-900 mb-1">{{ categoryValue() | titlecase }}</h1>
        <p class="text-base text-gray-600 mb-6">
          {{ store.filteredProducts().length }} products found
        </p>

        <div class="responsive-grid">
          @for (product of store.filteredProducts(); track product.id) {
            <app-product-card [product]="product">
              <app-toggle-wishlist-button
                class="!absolute z-10 top-3 right-3 !bg-white shadow-md rounded-md transition-all duration-200 hover:scale-110 hover:shadow-lg"
                [product]="product"
                [style.view-transition-name]="'wishlist-button-' + product.id"
              />
            </app-product-card>
          }
        </div>
      </mat-sidenav-content>
    </mat-sidenav-container>

    <div class="bg-gray100 p-6 h-full"></div>
  `,
  styles: ``,
})
export default class ProductsGrid {
route = inject(ActivatedRoute);

category = toSignal(
  this.route.paramMap,
  { initialValue: this.route.snapshot.paramMap }

);

categoryValue = computed(() =>
  this.category()?.get('category') ?? 'all'
);
  store = inject(EcommerceStore);

  categories = [
    { label: 'All', value: 'all' },
    { label: 'Automation', value: 'automation' },
    { label: 'Drives', value: 'drives' },
    { label: 'Pumps', value: 'pumps' },
    { label: 'Valves', value: 'valves' },
    { label: 'Heat Exchangers', value: 'heat-exchangers' },
  ];

constructor() {
  effect(() => {
    const category = this.categoryValue();

    this.store.setCategory(category);
    this.store.setProductsListSeoTags(category);
  });
}}