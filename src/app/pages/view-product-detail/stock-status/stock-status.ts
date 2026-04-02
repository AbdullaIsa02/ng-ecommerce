import { Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-stock-status',
  imports: [MatIcon],
  template: `
  @if (inStock()) {
    <div class="flex items-center gap-2 border border-green-200 rounded-lg px-3 py-3 bg-white w-full">

    <mat-icon class="small">check_circle</mat-icon>
    <span class="text-green-800">In stock and ready to ship</span>
  </div>
  } @else {
  <div
    class="flex items-center gap-2 border border-red-800 rounded-lg px-3 py-3 bg-white w-full danger">

    <mat-icon class="small">warrning</mat-icon>
    <span class="text-xs">
      This item is currenty out of stock, Add it to your wishlist to be notified when it's available again</span>
  </div>
  }

  `,
  styles: ``,
  host: {
    class: 'block',
  }
})
export class StockStatus {
inStock=input(false);
}
