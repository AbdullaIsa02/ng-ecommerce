import { Component } from '@angular/core';
 import {MatToolbar} from '@angular/material/toolbar';
import { HeaderActions } from "../header-actions/header-actions";
 
 @Component({
     selector: 'app-header',
   imports: [MatToolbar, HeaderActions],
    template: `<mat-toolbar class="w-full elevated py-2">
      <div class="max-w-[1200] mx-auto w-full">Modern Store</div>
      <app-header-actions/>
      </mat-toolbar>`,
     styles: ``, 
     })
     export class Header {}