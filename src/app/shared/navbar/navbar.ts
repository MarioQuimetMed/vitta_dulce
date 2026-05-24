import { Component, ChangeDetectionStrategy, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      height: var(--navbar-height);
      transition: all var(--transition-base);
    }

    nav.scrolled {
      background: rgba(253, 250, 246, 0.92);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      box-shadow: 0 1px 0 rgba(90, 64, 52, 0.08), var(--shadow-sm);
    }

    nav.top {
      background: transparent;
    }

    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 100%;
      max-width: var(--container-max);
      margin-inline: auto;
      padding-inline: var(--space-6);
    }

    .logo {
      display: flex;
      flex-direction: column;
      line-height: 1;
      text-decoration: none;
    }

    .logo-name {
      font-family: var(--font-display);
      font-size: var(--text-2xl);
      font-weight: 700;
      color: var(--cacao-profundo);
      letter-spacing: -0.02em;
      font-style: italic;
    }

    .logo-slogan {
      font-family: var(--font-body);
      font-size: 0.625rem;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--verde-salvia-dark);
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: var(--space-8);
    }

    .nav-links a {
      font-size: var(--text-sm);
      font-weight: 600;
      letter-spacing: 0.04em;
      color: var(--gris-800);
      text-decoration: none;
      position: relative;
      transition: color var(--transition-fast);
    }

    .nav-links a::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: var(--verde-salvia);
      border-radius: var(--radius-full);
      transform: scaleX(0);
      transition: transform var(--transition-base);
    }

    .nav-links a:hover,
    .nav-links a.active {
      color: var(--cacao-profundo);
    }

    .nav-links a:hover::after,
    .nav-links a.active::after {
      transform: scaleX(1);
    }

    .nav-cta {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }

    .whatsapp-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      padding: var(--space-2) var(--space-5);
      background: var(--verde-salvia);
      color: var(--blanco);
      border-radius: var(--radius-full);
      font-size: var(--text-sm);
      font-weight: 700;
      transition: all var(--transition-base);
      text-decoration: none;
    }

    .whatsapp-btn:hover {
      background: var(--verde-salvia-dark);
      transform: translateY(-1px);
      box-shadow: var(--shadow-md);
    }

    .whatsapp-btn svg {
      flex-shrink: 0;
    }

    /* Mobile menu toggle */
    .menu-toggle {
      display: none;
      flex-direction: column;
      gap: 5px;
      padding: var(--space-2);
      cursor: pointer;
      background: none;
      border: none;
    }

    .menu-toggle span {
      display: block;
      width: 24px;
      height: 2px;
      background: var(--cacao-profundo);
      border-radius: var(--radius-full);
      transition: all var(--transition-base);
    }

    .menu-toggle.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .menu-toggle.open span:nth-child(2) {
      opacity: 0;
    }
    .menu-toggle.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    @media (max-width: 768px) {
      .menu-toggle {
        display: flex;
      }

      .nav-links,
      .nav-cta {
        display: none;
      }

      .mobile-open .nav-links,
      .mobile-open .nav-cta {
        display: flex;
      }

      nav.mobile-open {
        height: auto;
        background: rgba(253, 250, 246, 0.98);
        backdrop-filter: blur(16px);
      }

      .nav-inner {
        flex-wrap: wrap;
        padding-block: var(--space-4);
        height: auto;
      }

      .nav-links {
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: var(--space-4);
        padding-block: var(--space-4);
        border-top: 1px solid var(--gris-200);
      }

      .nav-cta {
        width: 100%;
        padding-bottom: var(--space-4);
      }
    }
  `],
  template: `
    <nav [class.scrolled]="isScrolled()" [class.top]="!isScrolled()" [class.mobile-open]="mobileOpen()">
      <div class="nav-inner">
        <a routerLink="/" class="logo" aria-label="Vitta Dulce — ir al inicio">
          <span class="logo-name">Vitta Dulce</span>
          <span class="logo-slogan">Repostería Keto · Santa Cruz, Bo</span>
        </a>

        <button
          class="menu-toggle"
          [class.open]="mobileOpen()"
          (click)="toggleMenu()"
          [attr.aria-expanded]="mobileOpen()"
          aria-controls="nav-menu"
          aria-label="Abrir menú de navegación"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul class="nav-links" id="nav-menu" role="list">
          <li><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" (click)="closeMenu()">Inicio</a></li>
          <li><a routerLink="/catalogo" routerLinkActive="active" (click)="closeMenu()">Catálogo</a></li>
          <li><a routerLink="/nosotros" routerLinkActive="active" (click)="closeMenu()">Nosotros</a></li>
        </ul>

        <div class="nav-cta">
          <a
            href="https://wa.me/59170000000?text=Hola%2C%20me%20interesa%20hacer%20un%20pedido%20de%20Vitta%20Dulce"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-btn"
            aria-label="Hacer pedido por WhatsApp"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Pedir ahora
          </a>
        </div>
      </div>
    </nav>
  `,
  host: {
    '(window:scroll)': 'onScroll()'
  }
})
export class NavbarComponent {
  protected readonly isScrolled = signal(false);
  protected readonly mobileOpen = signal(false);

  onScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.mobileOpen.set(false);
  }
}
