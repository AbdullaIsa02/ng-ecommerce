import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { HeaderActions } from '../header-actions/header-actions';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, HeaderActions, RouterLink],
  template: `
    <mat-toolbar class="w-full elevated py-2">
      <div class="max-w-[1200] mx-auto w-full">
        <a routerLink="/products/all" class="logo">Crocus Trade</a>
      </div>
      <app-header-actions />
    </mat-toolbar>
  `,
  styles: [`
    .logo {
      text-decoration: none;
      color: inherit;
      font-weight: bold;
      font-size: 20px;
      cursor: pointer;
    }
  `],
})
export class Header {}