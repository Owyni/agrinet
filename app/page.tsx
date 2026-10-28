import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { getSession } from "@/lib/auth/session";
import { DEMO_FEATURED_PRODUCTS, DEMO_PRODUCER_STORIES } from "@/lib/data/demoProducts";
import { MapPinIcon, CheckCircleIcon, TruckIcon, ChatIcon, SearchIcon } from "@/components/ui/Icons";

async function HeroCtas() {
  const session = await getSession();

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
      <Link
        href="/catalogo"
        className="min-h-[48px] inline-flex items-center justify-center rounded-lg bg-field-primary px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
      >
        Explorar cosechas
      </Link>

      {session ? (
        <Link
          href={session.role === "producer" ? "/panel-productor" : "/pedidos"}
          className="min-h-[48px] inline-flex items-center justify-center rounded-lg border border-earth-border bg-surface px-6 py-3 text-base font-medium text-stone-800 hover:bg-earth-sand/50 transition-colors"
        >
          Mi Panel ({session.fullName.split(" ")[0]})
        </Link>
      ) : (
        <Link
          href="/register?rol=productor"
          className="min-h-[48px] inline-flex items-center justify-center rounded-lg border border-earth-border bg-surface px-6 py-3 text-base font-medium text-stone-800 hover:bg-earth-sand/50 transition-colors"
        >
          Vender mi cosecha
        </Link>
      )}
    </div>
  );
}

function HeroCtasFallback() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
      <Link
        href="/catalogo"
        className="min-h-[48px] inline-flex items-center justify-center rounded-lg bg-field-primary px-6 py-3 text-base font-semibold text-white shadow-sm"
      >
        Explorar cosechas
      </Link>
      <Link
        href="/register?rol=productor"
        className="min-h-[48px] inline-flex items-center justify-center rounded-lg border border-earth-border bg-surface px-6 py-3 text-base font-medium text-stone-800"
      >
        Vender mi cosecha
      </Link>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* 1. HERO PRINCIPAL: Bipartito, Editorial con fotografía estructural */}
      <section className="border-b border-earth-border bg-gradient-to-b from-earth-sand/20 to-background py-12 lg:py-20 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Zona izquierda: Contenido y llamadas a la acción */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-field-primary/20 bg-field-soft px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-field-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-field-primary"></span>
              Mercado Digital de Origen Agrícola
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.12]">
              Del campo mexicano a tu mesa,{" "}
              <span className="text-field-primary">sin rodeos.</span>
            </h1>

            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl">
              Descubre cosechas de productores mexicanos, compara precios y encuentra alimentos frescos directamente de quienes los cultivan.
            </p>

            <Suspense fallback={<HeroCtasFallback />}>
              <HeroCtas />
            </Suspense>

            {/* Micro-puntos informativos */}
            <div className="pt-4 flex flex-wrap gap-y-2 gap-x-6 text-xs text-stone-600 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-field-accent" />
                Venta por kilo o por caja
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-field-accent" />
                Contacto directo por WhatsApp
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircleIcon className="w-4 h-4 text-field-accent" />
                Precio definido por quien cultiva
              </span>
            </div>
          </div>

          {/* Zona derecha: Fotografía estructural de gran formato */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] sm:aspect-[5/4] lg:aspect-[4/5] rounded-2xl overflow-hidden border border-earth-border shadow-md bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1200&q=80"
                alt="Agricultora campesina en huerto de hortalizas frescas en México"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              {/* Fondo uniforme para mantener legible el texto sobre cualquier fotografía. */}
              <div className="absolute inset-x-0 bottom-0 bg-black/75 p-4 sm:p-5 text-white">
                <p className="text-xs font-semibold tracking-wide uppercase text-white">
                  Campo de hortalizas • Atlixco, Puebla
                </p>
                <p className="text-sm font-medium mt-0.5">
                  Cosecha matutina lista para distribución local
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATÁLOGO DESTACADO EN PORTADA */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 mx-auto max-w-7xl w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-earth-clay-ink">
              Cosechas de Temporada
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1.5">
              Alimentos frescos de productores mexicanos
            </h2>
            <p className="text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
              Productos disponibles para entrega local o envío regional bajo acuerdo directo con cada productor.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-field-primary hover:text-field-accent transition-colors self-start md:self-end"
          >
            <span>Explorar todo el catálogo</span>
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Cuadrícula adaptable de cuatro productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_FEATURED_PRODUCTS.map((product) => (
            <article
              key={product.id}
              className="flex flex-col justify-between rounded-xl border border-earth-border bg-surface overflow-hidden shadow-sm hover:border-field-primary/60 transition-all group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full bg-stone-100 overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-field-primary border border-field-primary/20">
                    {product.farmingMethod}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-center gap-1 text-xs text-stone-500 mb-1.5">
                    <MapPinIcon className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>{product.locality}, {product.state}</span>
                  </div>

                  <h3 className="font-bold text-base text-foreground group-hover:text-field-primary transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-xs text-stone-600 mt-1">
                    Por: <span className="font-medium text-stone-800">{product.producerName}</span>
                  </p>

                  <div className="mt-3 text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md font-medium inline-block">
                    {product.availability}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-earth-border/80 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold text-field-primary">
                    ${product.pricePerUnit.toFixed(2)}
                  </span>
                  <span className="text-xs text-stone-500 ml-1">MXN / {product.unit}</span>
                </div>

                <Link
                  href="/catalogo"
                  className="min-h-[44px] px-3.5 py-2 inline-flex items-center justify-center rounded-lg bg-field-soft text-xs font-semibold text-field-primary hover:bg-field-primary hover:text-white transition-colors"
                >
                  Ver cosecha
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 3. HISTORIAS DE PRODUCTORES (Enfoque visual y auténtico) */}
      <section className="bg-earth-sand/30 border-y border-earth-border py-16 px-4 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-field-primary">
              Raíces Agrícolas
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1.5">
              Conoce a quienes cuidan y cultivan la tierra
            </h2>
            <p className="text-sm text-stone-700 mt-2 leading-relaxed">
              Detrás de cada caja de fruta o manojo de hortaliza hay familias agricultoras que dedican su vida a producir alimentos limpios.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {DEMO_PRODUCER_STORIES.map((producer) => (
              <div
                key={producer.id}
                className="rounded-2xl border border-earth-border bg-surface p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row gap-6 items-start"
              >
                <div className="relative h-28 w-28 sm:h-36 sm:w-36 shrink-0 rounded-xl overflow-hidden border border-earth-border bg-stone-100">
                  <Image
                    src={producer.imageUrl}
                    alt={producer.imageAlt}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                    <MapPinIcon className="w-3.5 h-3.5 text-field-accent shrink-0" />
                    <span>{producer.locality}, {producer.state}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl text-foreground">
                    {producer.name}
                  </h3>

                  <p className="text-xs font-semibold text-field-primary">
                    {producer.farmName} • {producer.cropFocus}
                  </p>

                  <p className="text-sm text-stone-700 leading-relaxed pt-1">
                    «{producer.story}»
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CÓMO FUNCIONA: 3 Pasos Claros y Transparentes */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-earth-clay-ink">
            Flujo de Venta Directa
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mt-1.5">
            Cómo funciona Agrinet
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Un puente simple y honesto entre la parcela y tu mesa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="rounded-xl border border-earth-border bg-surface p-7 shadow-sm relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-field-soft text-field-primary mb-5">
              <SearchIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Paso 1
            </span>
            <h3 className="font-bold text-lg text-foreground mb-2">
              Encuentra una cosecha
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Explora qué productos están listos para corte o disponibles en tu estado. Consulta precios por kilo para hogar o precio por volumen para restaurante o frutería.
            </p>
          </div>

          <div className="rounded-xl border border-earth-border bg-surface p-7 shadow-sm relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-field-soft text-field-primary mb-5">
              <ChatIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Paso 2
            </span>
            <h3 className="font-bold text-lg text-foreground mb-2">
              Contacta y acuerda la compra
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Comunícate directamente con el agricultor por WhatsApp para resolver dudas de maduración, acordar la cantidad exacta y pactar el método de pago (transferencia SPEI o contra entrega).
            </p>
          </div>

          <div className="rounded-xl border border-earth-border bg-surface p-7 shadow-sm relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-field-soft text-field-primary mb-5">
              <TruckIcon className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Paso 3
            </span>
            <h3 className="font-bold text-lg text-foreground mb-2">
              Coordina la entrega
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              Define el punto de recolección local, la entrega directa por parte del agricultor o el flete convenido. Recibe producto fresco con valor total para quien lo cosechó.
            </p>
          </div>
        </div>

        {/* Nota transparente de funcionalidad MVP (C-5 & R-36) */}
        <div className="mt-8 rounded-xl bg-earth-sand/50 border border-earth-border p-4 text-xs text-stone-700 max-w-3xl mx-auto flex items-start gap-3">
          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-field-primary text-white text-[10px] font-bold mt-0.5">
            i
          </div>
          <p className="leading-relaxed">
            <strong>Transparencia de la plataforma:</strong> Agrinet facilita la visibilidad de cosechas y el contacto directo con los agricultores. Los acuerdos de pago y traslado se coordinan de forma directa entre comprador y productor, sin intermediarios ni comisiones sobre la cosecha.
          </p>
        </div>
      </section>

      {/* 5. LLAMADA A LA ACCIÓN PARA AGRICULTORES (Bloque editorial distintivo) */}
      <section className="mx-4 sm:mx-6 mb-16 max-w-7xl lg:mx-auto">
        <div className="rounded-2xl bg-field-primary text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">
              Convocatoria de Productores
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              ¿Cultivas la tierra? Comercializa tu cosecha a precio justo.
            </h2>
            <p className="text-sm sm:text-base text-stone-200 leading-relaxed">
              Publica tus frutas, verduras o granos directamente desde tu teléfono móvil. Llega a restaurantes locales, fruterías y familias que valoran el trabajo campesino y están dispuestas a pagar el valor real de tus alimentos.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Link
                href="/register?rol=productor"
                className="min-h-[48px] inline-flex items-center justify-center rounded-lg bg-white px-7 py-3 text-base font-semibold text-field-primary hover:bg-stone-100 transition-colors shadow-sm"
              >
                Registrar mi huerto o rancho
              </Link>
              <Link
                href="/productores"
                className="min-h-[48px] inline-flex items-center justify-center rounded-lg border border-white/30 px-7 py-3 text-base font-medium text-white hover:bg-white/10 transition-colors"
              >
                Conocer la red de productores
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
