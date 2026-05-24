import { Component, ChangeDetectionStrategy, computed, inject } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { getProductById, PRODUCTS, Product } from '../../core/products.data';
import { signal } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly params = toSignal(this.route.params);

  protected readonly product = computed<Product | undefined>(() => {
    const id = this.params()?.['id'];
    return id ? getProductById(id) : undefined;
  });

  protected readonly selectedVariant = signal(0);

  protected readonly selectedPrice = computed(() => {
    const p = this.product();
    if (!p) return 0;
    const v = p.variants[this.selectedVariant()];
    return v ? v.price : p.price;
  });

  protected readonly relatedProducts = computed<Product[]>(() => {
    const p = this.product();
    if (!p) return [];
    return PRODUCTS.filter((prod) => prod.id !== p.id).slice(0, 3);
  });

  selectVariant(index: number): void {
    this.selectedVariant.set(index);
  }

  protected getWhatsAppUrl(product: Product): string {
    const variant = product.variants[this.selectedVariant()];
    const variantLabel = variant ? variant.label : product.name;
    const msg = encodeURIComponent(
      `Hola, quiero pedir: ${product.name} — ${variantLabel} (Bs ${this.selectedPrice()})`
    );
    return `https://wa.me/59170000000?text=${msg}`;
  }
}
