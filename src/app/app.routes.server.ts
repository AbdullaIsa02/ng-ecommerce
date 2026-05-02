import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:categoryName',
    renderMode: RenderMode.Server, // SSR на лету
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];