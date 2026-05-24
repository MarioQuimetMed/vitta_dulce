import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomeComponent),
    title: 'Vitta Dulce — Repostería Keto Artesanal',
  },
  {
    path: 'catalogo',
    loadComponent: () => import('./pages/catalog/catalog').then((m) => m.CatalogComponent),
    title: 'Catálogo — Vitta Dulce',
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
      import('./pages/product-detail/product-detail').then((m) => m.ProductDetailComponent),
    title: 'Producto — Vitta Dulce',
  },
  {
    path: 'nosotros',
    loadComponent: () => import('./pages/about/about').then((m) => m.AboutComponent),
    title: 'Quiénes Somos — Vitta Dulce',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
