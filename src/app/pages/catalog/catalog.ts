import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { PRODUCTS, Product } from '../../core/products.data';
import { inject } from '@angular/core';

type Category = 'todos' | 'tortas' | 'panes' | 'postres';

@Component({
  selector: 'app-catalog',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class CatalogComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly queryParams = toSignal(this.route.queryParams);

  protected readonly activeCategory = computed<Category>(() => {
    const cat = this.queryParams()?.['categoria'] as Category;
    return cat && ['tortas', 'panes', 'postres'].includes(cat) ? cat : 'todos';
  });

  protected readonly categories: { value: Category; label: string; emoji: string }[] = [
    { value: 'todos', label: 'Todos', emoji: '✨' },
    { value: 'tortas', label: 'Tortas', emoji: '🎂' },
    { value: 'panes', label: 'Panes', emoji: '🍞' },
    { value: 'postres', label: 'Postres', emoji: '🍮' },
  ];

  protected readonly filteredProducts = computed<Product[]>(() => {
    const cat = this.activeCategory();
    return cat === 'todos' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat);
  });

  protected readonly selectedProduct = signal<Product | null>(null);

  openProduct(product: Product): void {
    this.selectedProduct.set(product);
  }
}
