export interface ProductVariant {
  label: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  unit: string;
  category: 'tortas' | 'panes' | 'postres';
  netCarbs: number;
  portionSize: string;
  image: string;
  variants: ProductVariant[];
  ingredients: string[];
  tags: string[];
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'torta-vainilla-almendra',
    name: 'Torta Keto de Vainilla y Almendra',
    shortDescription: 'Suave, esponjosa y sin culpa. La celebración que tu salud también merece.',
    fullDescription:
      'Nuestra torta estrella está elaborada con harina de almendra de primera calidad, eritritol natural y vainilla pura. ' +
      'Cada porción aporta solo 2,3 g de carbohidratos netos, por lo que puedes celebrar sin disparar tu glucosa. ' +
      'Perfecta para cumpleaños, reuniones familiares o simplemente darte un gusto merecido. ' +
      'Rinde 10 porciones generosas, lista para decorar o disfrutar tal como es.',
    price: 160,
    unit: 'unidad (10 porciones)',
    category: 'tortas',
    netCarbs: 2.3,
    portionSize: '1 porción (aprox. 100 g)',
    image: '/producto-torta-vainilla.png',
    variants: [
      { label: 'Torta completa (10 porciones)', price: 160 },
      { label: 'Media torta (5 porciones)', price: 85 },
    ],
    ingredients: ['Harina de almendra', 'Eritritol', 'Huevos', 'Mantequilla sin sal', 'Vainilla pura', 'Polvo de hornear'],
    tags: ['sin azúcar', 'keto', 'sin gluten', 'celebración'],
    featured: true,
  },
  {
    id: 'pan-multisemillas',
    name: 'Pan Keto Multisemillas',
    shortDescription: 'El pan de cada día que sí puedes comer. Crujiente, nutritivo y bajo en carbs.',
    fullDescription:
      'Un pan artesanal que redefine tu desayuno o merienda. Elaborado con una mezcla de linaza, chía y semillas de girasol, ' +
      'aporta fibra, omega-3 y proteínas, con solo 1,7 g de carbohidratos netos por rebanada. ' +
      'Textura firme por fuera y suave por dentro. Ideal tostado con aguacate, queso o cualquier acompañamiento de tu preferencia. ' +
      'Libre de harinas refinadas y azúcares añadidos.',
    price: 60,
    unit: 'unidad',
    category: 'panes',
    netCarbs: 1.7,
    portionSize: '1 rebanada (aprox. 40 g)',
    image: '/producto-pan-multisemillas.png',
    variants: [
      { label: 'Pan completo', price: 60 },
      { label: 'Pack 2 panes', price: 110 },
    ],
    ingredients: ['Harina de almendra', 'Semillas de linaza', 'Chía', 'Semillas de girasol', 'Psyllium husk', 'Huevos', 'Aceite de coco'],
    tags: ['sin azúcar', 'keto', 'alto en fibra', 'desayuno'],
    featured: true,
  },
  {
    id: 'cheesecake-keto',
    name: 'Cheesecake Keto Natural',
    shortDescription: 'Cremoso, sin culpa y delicioso. El postre que transforma cuidarse en placer.',
    fullDescription:
      'Nuestro cheesecake keto es un festín de cremosidad. Elaborado con queso crema natural, eritritol y una base de almendra y mantequilla, ' +
      'ofrece la experiencia sensorial de un cheesecake tradicional con apenas 2,4 g de carbohidratos netos por porción. ' +
      'Disponible en su versión natural (sin topping) o con coulis de frutos rojos naturales. ' +
      'Ideal para diabéticos, personas con prediabetes o cualquiera que quiera disfrutar sin restricciones.',
    price: 80,
    unit: 'unidad',
    category: 'postres',
    netCarbs: 2.4,
    portionSize: '1 porción (aprox. 120 g)',
    image: '/producto-cheesecake.png',
    variants: [
      { label: 'Natural (sin topping)', price: 80 },
      { label: 'Con coulis de frutos rojos', price: 95 },
    ],
    ingredients: ['Queso crema natural', 'Eritritol', 'Harina de almendra', 'Mantequilla', 'Huevos', 'Extracto de vainilla'],
    tags: ['sin azúcar', 'keto', 'postre', 'cremoso'],
    featured: true,
  },
  {
    id: 'brownie-cacao',
    name: 'Brownie Keto de Cacao',
    shortDescription: 'Intenso, húmedo y sin remordimientos. Tu antojo de chocolate resuelto.',
    fullDescription:
      'El brownie keto de Vitta Dulce es para quienes no pueden vivir sin chocolate pero cuidan su salud. ' +
      'Elaborado con cacao puro al 100%, harina de almendra y eritritol, aporta solo 1,9 g de carbohidratos netos por unidad. ' +
      'Textura húmeda y densa, con ese sabor intenso a cacao que satisface cualquier antojo. ' +
      'Se vende en lotes de 12 unidades, ideal para compartir en la oficina, regalo o tener en casa toda la semana.',
    price: 15,
    unit: 'por unidad (lote mínimo 12)',
    category: 'postres',
    netCarbs: 1.9,
    portionSize: '1 brownie (aprox. 45 g)',
    image: '/producto-brownie-cacao.png',
    variants: [
      { label: 'Lote de 12 unidades', price: 180 },
      { label: 'Lote de 24 unidades', price: 340 },
    ],
    ingredients: ['Cacao puro 100%', 'Harina de almendra', 'Eritritol', 'Huevos', 'Mantequilla sin sal', 'Extracto de vainilla'],
    tags: ['sin azúcar', 'keto', 'chocolate', 'antojo'],
    featured: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured);
}
