import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  imports: [MatIcon, MatButton, RouterLink],
  template: `
    <div class="flex justify-center items-center h-[calc(100vh-64px)] py-6">
      <div
        class="flex flex-col items-center justify-center text-center bg-white rounded-xl shadow p-8 gap-6
        max-w-md w-full mx-auto"
      >
        <mat-icon
          role="img"
          class="mat-icon notranslate !text-green-500 !h-[56px] !w-[56px] !text-[56px] material-icons mat-ligature-font mat-icon-no-color"
          aria-hidden="true"
          data-mat-icon-type="font"
          >check_circle</mat-icon
        >
        <h2 class="font-semibold text-green-600 text-2xl font-bold">Order Successfully!</h2>
        <p class="text-base">
          Thank you for your purchase! Your order has been confirmed and will be shipped soon.
        </p>
        <p class="text-gray-600">
          You will receive an email confirmation shortly with your order details and tracking
          information.
        </p>
        <button matButton="filled" color="primary" class="w-full max-w-xs mt-2" routerLink="/">
          Continue Shopping
        </button>
      </div>
    </div>
  `,
  styles: ``,
})
export default class OrderSuccess {}
