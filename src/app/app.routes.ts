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
    path: 'politica-envio',
    loadComponent: () =>
      import('./pages/policies/shipping/shipping').then((m) => m.ShippingComponent),
    title: 'Política de Envío — Vitta Dulce',
  },
  {
    path: 'devoluciones',
    loadComponent: () =>
      import('./pages/policies/returns/returns').then((m) => m.ReturnsComponent),
    title: 'Política de Devoluciones — Vitta Dulce',
  },
  {
    path: 'privacidad',
    loadComponent: () =>
      import('./pages/policies/privacy/privacy').then((m) => m.PrivacyComponent),
    title: 'Política de Privacidad — Vitta Dulce',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
