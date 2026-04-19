import { computed, inject } from '@angular/core';
import { Product } from './models/product';
import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { produce } from 'immer';
import { Toaster } from './servises/toaster';
import { CartItem } from './models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from './components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from './models/user';
import { Router } from '@angular/router';
import { Order } from './models/order';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { AddReviewParams, UserReview } from './models/user-review';
export type EcommerceState = {
  products: Product[];
  category: string;
search: string;

  wishlistItems: Product[];
  cartItems: CartItem[];
  user: User | undefined;

  loading: boolean;
  selectedProductId: string | undefined;

  writeReview: boolean;
};

export const EcommerceStore = signalStore(
  { providedIn: 'root' },
  withState({
    products: [
      {
        id: 'p-1',
        name: 'Ridan',
        description: '21RT0206R — Терморегулятор Ридан Compact (Компакт)',
        price: 299.99,
        imageUrl: 'https://ridan.kz/open-files/files/1824/1824339-21RT0206R+Compact.png',
        rating: 4.6,
        reviewCount: 128,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r-p1-1',
            productId: 'p-1',
            userName: 'Alex Kim',
            userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
            rating: 5,
            title: 'Отличный',
            comment: 'Работает стабильно.',
            reviewDate: new Date(),
          },
          {
            id: 'r-p1-2',
            productId: 'p-1',
            userName: 'Ivan Petrov',
            userImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
            rating: 4,
            title: 'Хорошо',
            comment: 'Нормальное качество.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '2',
        name: 'Smart 4K TV',
        description: '65-inch OLED Smart TV with HDR and built-in streaming apps',
        price: 1299.99,
        imageUrl:
          'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&w=400&q=80',
        rating: 4.6,
        reviewCount: 6,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r-2-1',
            productId: '2',
            userName: 'John Smith',
            userImageUrl: 'https://randomuser.me/api/portraits/men/10.jpg',
            rating: 5,
            title: 'Amazing',
            comment: 'Picture is awesome!',
            reviewDate: new Date(),
          },
          {
            id: 'r-2-2',
            productId: '2',
            userName: 'Emily Rose',
            userImageUrl: 'https://randomuser.me/api/portraits/women/22.jpg',
            rating: 4,
            title: 'Good',
            comment: 'Sound could be better.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '3',
        name: 'Professional Camera',
        description: 'Mirrorless digital camera with 4K video capabilities',
        price: 899.99,
        imageUrl:
          'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&w=400&q=80',
        rating: 4.4,
        reviewCount: 6,
        inStock: true,
        category: 'electronics',
        reviews: [
          {
            id: 'r-3-1',
            productId: '3',
            userName: 'Chris Nolan',
            userImageUrl: 'https://randomuser.me/api/portraits/men/33.jpg',
            rating: 5,
            title: 'Perfect',
            comment: 'Great for video.',
            reviewDate: new Date(),
          },
          {
            id: 'r-3-2',
            productId: '3',
            userName: 'Anna White',
            userImageUrl: 'https://randomuser.me/api/portraits/women/41.jpg',
            rating: 4,
            title: 'Nice',
            comment: 'Battery could be better.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '4',
        name: 'Classic Denim Jacket',
        description: 'Vintage-style denim jacket with modern fit',
        price: 79.99,
        imageUrl:
          'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&w=400&q=80',
        rating: 4.2,
        reviewCount: 5,
        inStock: true,
        category: 'clothing',
        reviews: [
          {
            id: 'r-4-1',
            productId: '4',
            userName: 'Mike T.',
            userImageUrl: 'https://randomuser.me/api/portraits/men/20.jpg',
            rating: 5,
            title: 'Stylish',
            comment: 'Looks great.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '5',
        name: 'Cotton T-Shirt Pack',
        description: 'Set of 3 premium cotton t-shirts in essential colors',
        price: 34.99,
        imageUrl:
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: true,
        category: 'clothing',
        reviews: [
          {
            id: 'r-5-1',
            productId: '5',
            userName: 'Sara L.',
            userImageUrl: 'https://randomuser.me/api/portraits/women/30.jpg',
            rating: 5,
            title: 'Comfortable',
            comment: 'Very soft fabric.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '6',
        name: 'Wool Winter Coat',
        description: 'Elegant wool-blend coat perfect for cold weather',
        price: 199.99,
        imageUrl:
          'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: true,
        category: 'clothing',
        reviews: [
          {
            id: 'r-6-1',
            productId: '6',
            userName: 'Olga K.',
            userImageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
            rating: 5,
            title: 'Warm',
            comment: 'Perfect for winter.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '7',
        name: 'Leather Watch',
        description: 'Classic analog watch with genuine leather strap',
        price: 149.99,
        imageUrl:
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&w=400&q=80',
        rating: 4.3,
        reviewCount: 5,
        inStock: true,
        category: 'accessories',
        reviews: [
          {
            id: 'r-7-1',
            productId: '7',
            userName: 'Daniel P.',
            userImageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
            rating: 5,
            title: 'Elegant',
            comment: 'Looks premium.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '8',
        name: 'Designer Sunglasses',
        description: 'UV-protected polarized sunglasses with premium frame',
        price: 129.99,
        imageUrl:
          'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: true,
        category: 'accessories',
        reviews: [
          {
            id: 'r-8-1',
            productId: '8',
            userName: 'Anna K.',
            userImageUrl: 'https://randomuser.me/api/portraits/women/50.jpg',
            rating: 5,
            title: 'Cool',
            comment: 'Stylish and comfortable.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '9',
        name: 'Leather Wallet',
        description: 'Handcrafted leather wallet with RFID protection',
        price: 49.99,
        imageUrl:
          'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: true,
        category: 'accessories',
        reviews: [
          {
            id: 'r-9-1',
            productId: '9',
            userName: 'Max B.',
            userImageUrl: 'https://randomuser.me/api/portraits/men/70.jpg',
            rating: 5,
            title: 'Nice wallet',
            comment: 'Good quality leather.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '10',
        name: 'Smart Coffee Maker',
        description: 'WiFi-enabled coffee maker with programmable brewing',
        price: 199.99,
        imageUrl:
          'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&w=400&q=80',
        rating: 4.2,
        reviewCount: 5,
        inStock: true,
        category: 'home',
        reviews: [
          {
            id: 'r-10-1',
            productId: '10',
            userName: 'Coffee Lover',
            userImageUrl: 'https://randomuser.me/api/portraits/men/80.jpg',
            rating: 5,
            title: 'Great coffee',
            comment: 'Makes perfect coffee.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '11',
        name: 'Air Purifier',
        description: 'HEPA air purifier with air quality monitoring',
        price: 249.99,
        imageUrl:
          'https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&w=400&q=80',
        rating: 4.2,
        reviewCount: 5,
        inStock: true,
        category: 'home',
        reviews: [
          {
            id: 'r-11-1',
            productId: '11',
            userName: 'Clean Air',
            userImageUrl: 'https://randomuser.me/api/portraits/women/60.jpg',
            rating: 5,
            title: 'Fresh air',
            comment: 'Really works.',
            reviewDate: new Date(),
          },
        ],
      },

      {
        id: '12',
        name: 'Robot Vacuum',
        description: 'Smart robot vacuum with mapping and scheduling',
        price: 399.99,
        imageUrl:
          'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&w=400&q=80',
        rating: 4.5,
        reviewCount: 6,
        inStock: false,
        category: 'home',
        reviews: [
          {
            id: 'r-12-1',
            productId: '12',
            userName: 'Olga K.',
            userImageUrl: 'https://randomuser.me/api/portraits/women/5.jpg',
            rating: 5,
            title: 'Очень удобно',
            comment: 'Сам убирает.',
            reviewDate: new Date(),
          },
        ],
      },
    ],
    category: 'all',

  // 🔍 ВОТ СЮДА
  search: '',

  wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    selectedProductId: undefined,
    writeReview: false,
  } as EcommerceState),
   // TEMP: отключено из-за SSR (localStorage is not defined)
  // withStorageSync({
  //   key: 'modern-store',
  //   select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }),
  // }),
withComputed(({ category, products, wishlistItems, cartItems, selectedProductId, search }) => ({
  filteredProducts: computed(() => {

    const term = (search() || '').toLowerCase().trim();

    return products().filter((p) => {

      const matchesCategory =
        category() === 'all' || p.category === category().toLowerCase();

      const matchesSearch =
        !term ||
        `${p.name} ${p.description} ${p.category}`
          .toLowerCase()
          .includes(term);

      return matchesCategory && matchesSearch;
    });

  }),

  wishlistCount: computed(() => wishlistItems().length),

  cartCount: computed(() =>
    cartItems().reduce((acc, item) => acc + item.quantity, 0)
  ),

  selectedProduct: computed(() =>
    products().find((p) => p.id === selectedProductId())
  ),
})),
  withMethods(
    (store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
      setCategory: signalMethod<string>((category: string) => {
        patchState(store, { category });
      }),
   resetFilters: () => {
  patchState(store, {
    search: '',
    category: 'all',
    selectedProductId: undefined,
  });
},
setSearch: signalMethod<string>((value: string) => {
  patchState(store, { search: value });
}),
      
      setProductId: signalMethod<string>((productId: string) => {
        patchState(store, { selectedProductId: productId });
      }),

      addToWishlist: (product: Product) => {
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { wishlistItems: updatedWishlistItems });
        toaster.success('Product added to wishlist');
      },
      removeFromWishlist: (product: Product) => {
        patchState(store, {
          wishlistItems: store.wishlistItems().filter((p) => p.id !== product.id),
        });
        toaster.success('Product removed from wishlist');
      },
      clearWishlist: () => {
        patchState(store, { wishlistItems: [] });
      },
      addToCart: (product: Product, quantity = 1) => {
        const existingItemIndex = store.cartItems().findIndex((i) => i.product.id === product.id);

        const updatedCartItems = produce(store.cartItems(), (draft) => {
          if (existingItemIndex !== -1) {
            draft[existingItemIndex].quantity += quantity;
            return;
          }
          draft.push({ product, quantity });
        });

        patchState(store, { cartItems: updatedCartItems });
        toaster.success(
          existingItemIndex !== -1 ? 'Product added again' : 'Product added to the cart',
        );
      },
      setItemQuantity(params: { productId: string; quantity: number }) {
        const index = store.cartItems().findIndex((c) => c.product.id === params.productId);
        const updated = produce(store.cartItems(), (draft) => {
          draft[index].quantity = params.quantity;
        });
        patchState(store, { cartItems: updated });
      },
      addAllWishlistToCart: () => {
        const updatedCartItems = produce(store.cartItems(), (draft) => {
          store.wishlistItems().forEach((p) => {
            if (!draft.find((c) => c.product.id === p.id)) {
              draft.push({ product: p, quantity: 1 });
            }
          });
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: [] });
      },
      moveToWishlist: (product: Product) => {
        const updatedCartItems = store.cartItems().filter((p) => p.product.id !== product.id);
        const updatedWishlistItems = produce(store.wishlistItems(), (draft) => {
          if (!draft.find((p) => p.id === product.id)) {
            draft.push(product);
          }
        });
        patchState(store, { cartItems: updatedCartItems, wishlistItems: updatedWishlistItems });
      },
      removeFromCart: (product: Product) => {
        patchState(store, {
          cartItems: store.cartItems().filter((p) => p.product.id !== product.id),
        });
      },

      proceedToCheckout: () => {
        if (!store.user()) {
          matDialog.open(SignInDialog, {
            disableClose: true,
            data: {
              checkout: true,
            },
          });
          return;
        }
        router.navigate(['/checkout']);
      },

      placeOrder: async () => {
        patchState(store, { loading: true });
        const user = store.user();
        if (!user) {
          toaster.error('Please login before placing  order');
          patchState(store, { loading: false });
          return;
        }

        const order: Order = {
          id: crypto.randomUUID(),
          userId: user.id,
          total: Math.round(
            store.cartItems().reduce((acc, item) => acc + item.quantity * item.product.price, 0),
          ),
          items: store.cartItems(),
          paymentStatus: 'success',
        };

        await new Promise((resolve) => setTimeout(resolve, 1000));

        patchState(store, { loading: false, cartItems: [] });
        router.navigate(['order-success']);
      },

      signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John Doe',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
        patchState(store, {
          user: {
            id: '1',
            email,
            name: 'John D',
            imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
          },
        });

        matDialog.getDialogById(dialogId)?.close();

        if (checkout) {
          router.navigate(['/checkout']);
        }
      },

      signOut: () => {
        patchState(store, { user: undefined });
      },

      showWriteReview: () => {
        patchState(store, { writeReview: true });
      },

      hideWriteReview: () => {
        patchState(store, { writeReview: false });
      },
      addReview: async ({ title, comment, rating }: AddReviewParams) => {
        patchState(store, { loading: true });
        const product = store.products().find((p) => p.id === store.selectedProductId());
        if (!product) {
          toaster.error('Product not found');
          patchState(store, { loading: false });
          return;
        }
        const newReview: UserReview = {
          id: crypto.randomUUID(),
          title,
          comment,
          rating,
          productId: product.id,
          userName: store.user()?.name || '',
          userImageUrl: store.user()?.imageUrl || '',
          reviewDate: new Date(),
        };
        const updatedProducts = produce(store.products(), (draft) => {
          const index = draft.findIndex((p) => p.id === product.id);
            draft[index].reviews.push(newReview);
          draft[index].rating =
            Math.round(
              (draft[index].reviews.reduce((acc, r) => acc + r.rating, 0) /
                draft[index].reviews.length) *
                10,
            ) / 10;
          draft[index].reviewCount = draft[index].reviews.length;
        });
        await new Promise((resolve) => setTimeout(resolve, 1000));
        patchState(store, { loading: false, products: updatedProducts, writeReview: false});
      },
    }),
  ),
);
