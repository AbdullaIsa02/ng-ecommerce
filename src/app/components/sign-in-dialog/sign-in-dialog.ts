import { Component, inject, input, signal } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatSuffix, MatPrefix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { Dialog } from '@angular/cdk/dialog';
import { SignInParams } from '../../models/user';


@Component({
  selector: 'app-sign-up-dialog',
    standalone: true,
  imports:  [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatSuffix,
    MatPrefix,
    MatButton,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign In</h2>
          <p class="text-sm text-gray-500">Sign in to your account to continue shopping</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>
      <form class="mt-6" [formGroup]="signInForm" (ngSubmit)="signIn()">
        <mat-form-field class= "mb-4">
          <input matInput formControlName="email" type="email" placeholder="Enter your email" /><mat-icon matPrefix>email</mat-icon>
        </mat-form-field>
        <mat-form-field class="mb-6">
          <input
            matInput
            formControlName="password"
            [type]="passwordVisible() ? 'text' : 'password'"
            placeholder="Enter your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            mat-icon-button
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon>{{ passwordVisible() ? 'visibility_off' : 'visibility' }}</mat-icon>
          </button>
        </mat-form-field>
        <button type="submit" matButton="filled" class="w-full">Sign In</button>
      </form>
    </div>
  `,
  styles: ``,
})
export class SignInDialog {
  fb = inject(NonNullableFormBuilder);
  store = inject(EcommerceStore);

  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);

  dialogRef = inject(MatDialogRef);

  passwordVisible = signal(false);
  signInForm = this.fb.group({
    email: ['john@test.com', Validators.required],
    password: ['test1234', Validators.required],
  });
 

  signIn() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.signInForm.value;

    this.store.signIn({email, password, checkout: this.data.checkout, dialogId: this.dialogRef.id } as SignInParams);
  }
}
