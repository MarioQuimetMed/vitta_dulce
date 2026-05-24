import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS, Product } from '../../core/products.data';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  protected readonly featuredProducts: Product[] = PRODUCTS;

  protected readonly benefits = [
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
      title: 'Sin azúcar añadida',
      desc: 'Endulzados únicamente con eritritol, un poliol natural que no eleva la glucosa.',
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
      title: 'Bajo en carbohidratos',
      desc: 'Menos de 2,5 g de carbohidratos netos por porción. Apto para dieta keto y control glucémico.',
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      title: 'Elaboración artesanal',
      desc: 'Preparado en cocina propia con ingredientes frescos y seleccionados, sin conservantes artificiales.',
    },
    {
      icon: `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm0 0v20M2 12h20"/></svg>`,
      title: 'Transparencia total',
      desc: 'Cada producto incluye información nutricional detallada. Sabes exactamente lo que comes.',
    },
  ];

  protected readonly categories = [
    { label: 'Tortas', icon: '🎂', route: '/catalogo', query: { categoria: 'tortas' } },
    { label: 'Panes', icon: '🍞', route: '/catalogo', query: { categoria: 'panes' } },
    { label: 'Postres', icon: '🍮', route: '/catalogo', query: { categoria: 'postres' } },
  ];
}
