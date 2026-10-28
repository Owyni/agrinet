import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { db, products, producerProfiles, users } from "@/lib/db";
import { eq } from "drizzle-orm";

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { id } = await params;
  const result = await db.select({ name: products.name }).from(products).where(eq(products.id, id)).limit(1);
  if (result.length === 0) return { title: "Cosecha no encontrada | Agrinet" };
  return {
    title: `${result[0].name} | Cosecha Directa en Agrinet México`,
  };
}

async function ProductDetailContent({ params }: ProductDetailPageProps) {
  const { id } = await params;

  const result = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      category: products.category,
      farmingMethod: products.farmingMethod,
      unit: products.unit,
      pricePerUnit: products.pricePerUnit,
      wholesalePrice: products.wholesalePrice,
      minWholesaleQuantity: products.minWholesaleQuantity,
      availableQuantity: products.availableQuantity,
      status: products.status,
      producerId: producerProfiles.id,
      farmName: producerProfiles.farmName,
      whatsapp: producerProfiles.whatsapp,
      deliveryOptions: producerProfiles.deliveryOptions,
      producerName: users.fullName,
      state: users.state,
      municipality: users.municipality,
    })
    .from(products)
    .innerJoin(producerProfiles, eq(products.producerId, producerProfiles.id))
    .innerJoin(users, eq(producerProfiles.userId, users.id))
    .where(eq(products.id, id))
    .limit(1);

  if (result.length === 0) {
    notFound();
  }

  const product = result[0];

  const whatsappMessage = encodeURIComponent(
    `Hola ${product.producerName}, vi tu cosecha de "${product.name}" en Agrinet México y me interesa comprar. ¿Podrías indicarme disponibilidad y opciones de entrega?`
  );
  const whatsappUrl = product.whatsapp
    ? `https://wa.me/52${product.whatsapp.replace(/\D/g, "")}?text=${whatsappMessage}`
    : null;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <Link
          href="/catalogo"
          className="text-sm font-medium text-field-primary hover:text-field-accent transition-colors"
        >
          ← Volver a cosechas disponibles
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Información principal del producto */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-2xl border border-earth-border bg-white dark:bg-stone-900 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-field-primary bg-field-soft px-3 py-1 rounded-full">
                {product.category}
              </span>
              <span className="text-xs font-medium text-stone-600 dark:text-stone-300 bg-earth-sand/60 px-3 py-1 rounded-full capitalize">
                Cultivo {product.farmingMethod}
              </span>
              <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full capitalize">
                {product.status}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
              {product.name}
            </h1>

            <p className="text-sm text-stone-500 mt-2">
              Ubicación del rancho: {product.municipality ? `${product.municipality}, ` : ""}{product.state || "México"}
            </p>

            <div className="mt-6 border-t border-earth-border pt-6">
              <h2 className="text-base font-semibold text-foreground mb-2">
                Descripción y condiciones de la cosecha
              </h2>
              <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed whitespace-pre-line">
                {product.description || "Cosecha fresca recolectada por el productor agrícola para entrega directa."}
              </p>
            </div>

            <div className="mt-6 border-t border-earth-border pt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-stone-500 block text-xs">Disponibilidad en huerto</span>
                <span className="font-semibold text-foreground text-base">
                  {Number(product.availableQuantity)} {product.unit}s
                </span>
              </div>
              <div>
                <span className="text-stone-500 block text-xs">Unidad de venta</span>
                <span className="font-semibold text-foreground text-base capitalize">
                  Por {product.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Información del Productor */}
          <div className="rounded-xl border border-earth-border bg-white dark:bg-stone-900 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-3">Sobre el Productor Agrícola</h2>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-field-soft flex items-center justify-center text-2xl font-bold text-field-primary">
                {product.farmName.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base">{product.farmName}</h3>
                <p className="text-xs text-stone-500">Agricultor responsable: {product.producerName}</p>
                <p className="text-xs text-field-accent font-medium mt-0.5">
                  📍 {product.municipality ? `${product.municipality}, ` : ""}{product.state || "México"}
                </p>
              </div>
            </div>
            {product.deliveryOptions && (
              <p className="mt-4 text-xs text-stone-600 dark:text-stone-400 bg-earth-sand/30 p-3 rounded-lg">
                Opciones de entrega: {product.deliveryOptions}
              </p>
            )}
          </div>
        </div>

        {/* Tarjeta de compra y contacto directo */}
        <div className="md:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-earth-border bg-white dark:bg-stone-900 p-6 shadow-sm space-y-6">
            <div>
              <span className="text-xs text-stone-500 uppercase tracking-wider block">Precio al menudeo</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-extrabold text-field-primary">
                  ${Number(product.pricePerUnit).toFixed(2)}
                </span>
                <span className="text-xs text-stone-500">MXN / {product.unit}</span>
              </div>
            </div>

            {product.wholesalePrice && (
              <div className="rounded-lg bg-earth-sand/50 p-3 border border-earth-border">
                <span className="text-xs font-bold text-earth-clay-ink block">
                  Precio Mayoreo (Restaurantes/Comercio)
                </span>
                <span className="text-xl font-bold text-earth-clay-ink">
                  ${Number(product.wholesalePrice).toFixed(2)} MXN
                </span>
                <span className="text-xs text-stone-600 block mt-0.5">
                  A partir de {product.minWholesaleQuantity || 5} {product.unit}s
                </span>
              </div>
            )}

            <div className="border-t border-earth-border pt-4 space-y-3">
              {whatsappUrl ? (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 transition-colors"
                >
                  <span>💬</span>
                  <span>Contactar por WhatsApp</span>
                </a>
              ) : (
                <div className="text-xs text-stone-500 text-center">
                  El productor aún no ha registrado número de WhatsApp.
                </div>
              )}

              <Link
                href="/register"
                className="w-full min-h-[44px] inline-flex items-center justify-center rounded-lg border border-field-primary bg-field-soft px-4 py-2.5 text-sm font-semibold text-field-primary hover:bg-field-soft/70 transition-colors"
              >
                Crear cuenta para pedir
              </Link>
            </div>

            <div className="text-[11px] text-stone-500 space-y-1.5 border-t border-earth-border pt-4">
              <p>✓ Trato 100% directo con el productor.</p>
              <p>✓ Sin comisiones abusivas de intermediarios.</p>
              <p>✓ Cosechado al momento del acuerdo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 animate-pulse">
      <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-32 mb-6"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800"></div>
        </div>
        <div className="h-64 rounded-2xl bg-stone-200 dark:bg-stone-800"></div>
      </div>
    </div>
  );
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailContent params={params} />
    </Suspense>
  );
}
