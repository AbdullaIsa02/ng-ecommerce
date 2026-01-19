import { Component, signal } from '@angular/core';
import {Product} from '../../models/product';
@Component({
  selector: 'app-products-grid',
  imports: [],
  template: `
    <p>
      products-grid works!
    </p>
  `,
  styles: ``,
})
export default class ProductsGrid {
products = signal <Product[]>([]);
}
