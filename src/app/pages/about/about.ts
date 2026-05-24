import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class AboutComponent {
  protected readonly team = [
    { name: 'Jhefferson Torrez Campero', role: 'Cofundador & Estrategia', initial: 'J' },
    { name: 'Erick Leonardo Ulloa Avila', role: 'Cofundador & Operaciones', initial: 'E' },
    { name: 'Adriana Gutiérrez Suarez', role: 'Cofundadora & Marketing', initial: 'A' },
    { name: 'Camila Guadalupe Flores Quispe', role: 'Cofundadora & Producto', initial: 'C' },
  ];

  protected readonly values = [
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
      title: 'Transparencia',
      desc: 'Información nutricional clara y honesta en cada producto. Sin sorpresas ni ingredientes ocultos.',
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>`,
      title: 'Empatía',
      desc: 'Entendemos la frustración de quienes se sienten excluidos en celebraciones. Existimos para cambiar eso.',
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"/></svg>`,
      title: 'Responsabilidad',
      desc: 'Nos responsabilizamos de lo que ponemos en tus manos. Cada receta es revisada y validada por nutricionistas.',
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
      title: 'Calidez',
      desc: 'Cada pedido es preparado con dedicación artesanal, como si lo hiciéramos para un familiar querido.',
    },
    {
      icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>`,
      title: 'Respeto por tu salud',
      desc: 'Tu bienestar es nuestra razón de ser. Nunca comprometemos la calidad ni la integridad nutricional.',
    },
  ];

  protected readonly timeline = [
    {
      year: '2024',
      title: 'La semilla de la idea',
      desc: 'Todo comenzó en la Facultad de Ciencias Económicas de la UAGRM. Cuatro estudiantes de Ingeniería Comercial identificaron un mercado desatendido: personas con diabetes que querían disfrutar de un postre sin culpa.',
    },
    {
      year: '2025',
      title: 'Primeras recetas y pruebas',
      desc: 'Meses de experimentación en cocina propia, ajustando proporciones de eritritol y harinas de almendra para lograr la textura perfecta sin comprometer el perfil glucémico.',
    },
    {
      year: '2025',
      title: 'Vitta Dulce nace',
      desc: 'Con la paleta de colores definida, el eslogan "Sabores que acompañan tu equilibrio" y los primeros 4 productos listos, Vitta Dulce abre sus puertas en Santa Cruz de la Sierra.',
    },
  ];
}
