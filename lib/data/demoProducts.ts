export interface DemoProduct {
  id: string;
  name: string;
  category: string;
  farmingMethod: string;
  pricePerUnit: number;
  unit: string;
  availableQuantity: number;
  producerName: string;
  farmName: string;
  locality: string;
  state: string;
  imageUrl: string;
  imageAlt: string;
  availability: string;
}

export const DEMO_FEATURED_PRODUCTS: DemoProduct[] = [
  {
    id: "demo-aguacate-hass",
    name: "Aguacate Hass de Altura",
    category: "Frutas",
    farmingMethod: "Agroecológico",
    pricePerUnit: 48,
    unit: "kg",
    availableQuantity: 450,
    producerName: "Don Francisco Morales",
    farmName: "Huerto Los Aguacales",
    locality: "Uruapan",
    state: "Michoacán",
    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Aguacates frescos recién cortados en caja de madera",
    availability: "Cosecha inmediata disponible",
  },
  {
    id: "demo-jitomate-saladet",
    name: "Jitomate Saladet de Riego",
    category: "Verduras",
    farmingMethod: "Tradicional limpio",
    pricePerUnit: 24,
    unit: "kg",
    availableQuantity: 600,
    producerName: "Elena Domínguez",
    farmName: "Rancho San Isidro",
    locality: "Atlixco",
    state: "Puebla",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Jitomates rojos en racimo madurados en mata",
    availability: "Corte diario bajo pedido",
  },
  {
    id: "demo-maiz-azul",
    name: "Maíz Azul Criollo para Nixtamal",
    category: "Granos",
    farmingMethod: "Milenario / Nativo",
    pricePerUnit: 36,
    unit: "kg",
    availableQuantity: 1200,
    producerName: "Mateo Bautista",
    farmName: "Parcela Tierra Fértil",
    locality: "Nochixtlán",
    state: "Oaxaca",
    imageUrl: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Mazorcas de maíz azul criollo desgranadas a mano",
    availability: "Grano seleccionado en costal",
  },
  {
    id: "demo-nopal-verdura",
    name: "Nopal Tierno de Huerto",
    category: "Verduras",
    farmingMethod: "Agroecológico",
    pricePerUnit: 18,
    unit: "kg",
    availableQuantity: 300,
    producerName: "Rosalba Sánchez",
    farmName: "Nopalera El Mirador",
    locality: "Tlalnepantla",
    state: "Morelos",
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Pencas tiernas de nopal recién cosechadas",
    availability: "Corte fresco matutino",
  },
];

export interface DemoProducerStory {
  id: string;
  name: string;
  farmName: string;
  state: string;
  locality: string;
  cropFocus: string;
  story: string;
  imageUrl: string;
  imageAlt: string;
}

export const DEMO_PRODUCER_STORIES: DemoProducerStory[] = [
  {
    id: "story-urapan",
    name: "Francisco Morales",
    farmName: "Huerto Los Aguacales",
    locality: "Uruapan",
    state: "Michoacán",
    cropFocus: "Aguacate Hass y cítricos",
    story: "Tres generaciones cultivando en laderas volcánicas. Al vender directamente a fruterías y familias en Agrinet, recibimos el pago íntegro sin que un acopiador decida el precio de nuestro esfuerzo.",
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Agricultor mexicano revisando cultivo en campo abierto al atardecer",
  },
  {
    id: "story-atlixco",
    name: "Elena Domínguez",
    farmName: "Rancho San Isidro",
    locality: "Atlixco",
    state: "Puebla",
    cropFocus: "Jitomate, calabacita y cilantro criollo",
    story: "Cosechamos en el valle de Atlixco con agua de deshielo del volcán. La venta directa nos permite cortar por la tarde y entregar al día siguiente en cocinas locales, conservando aroma y frescura incomparables.",
    imageUrl: "https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Productora campesina en huerto de hortalizas frescas",
  },
];
