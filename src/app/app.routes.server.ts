import { RenderMode, ServerRoute } from '@angular/ssr';
import { CategoryApi } from './servises/category-api';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:categoryName',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const catService = inject(CategoryApi);

      const names = await firstValueFrom(
        catService.getCategories()
      );

      return names.map((name: string) => ({
        categoryName: name,
      }));
    },
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];