import Link from "next/link";
import { Suspense } from "react";
import { db, products, producerProfiles, users } from "@/lib/db";
import { eq, desc } from "drizzle-orm";

export const metadata = {
  title: "Catálogo de Cosechas Frescas | Agrinet México",
  description: "Cosechas directas del campo mexicano disponibles para compra inmediata o bajo pedido.",
};

async function CatalogoList() {
  const harvestList = await db
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
      farmName: producerProfiles.farmName,
      state: users.state,
      municipality: users.municipality,
    })
    .from(products)
    .innerJoin(producerProfiles, eq(products.producerId, producerProfiles.id))
    .innerJoin(users, eq(producerProfiles.userId, users.id))
    .orderBy(desc(products.createdAt))
    .limit(24);

  if (harvestList.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-earth-border p-12 text-center bg-earth-sand/20">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-field-soft text-2xl text-field-primary mb-4">
          🧺
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Aún no hay cosechas publicadas en esta región
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          Estamos conectando a los primeros productores de Puebla, Michoacán, Oaxaca y el centro de México. ¿Eres agricultor? Comienza a vender hoy mismo.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/register?rol=productor"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-field-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
          >
            Publicar mi primera cosecha
          </Link>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-earth-border bg-white dark:bg-stone-800 px-5 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 hover:bg-stone-50 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {harvestList.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-between rounded-xl border border-earth-border bg-white p-5 shadow-sm transition-all hover:border-field-primary dark:bg-stone-900"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
              <span className="font-medium text-field-primary bg-field-soft px-2.5 py-1 rounded-full">
                {item.farmingMethod === "organico" ? "Orgánico" : "Agroecológico"}
              </span>
              <span>
                {item.municipality ? `${item.municipality}, ` : ""}{item.state || "México"}
              </span>
            </div>
            <h2 className="text-xl font-bold text-foreground">{item.name}</h2>
            <p className="text-xs text-stone-500 mt-0.5">Cultivado en: {item.farmName}</p>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
              {item.description || "Cosecha fresca recolectada bajo pedido directo con el agricultor."}
            </p>
          </div>

          <div className="mt-5 border-t border-earth-border pt-4">
            <div className="flex items-baseline justify-between mb-3">
              <div>
                <span className="text-2xl font-bold text-field-primary">
                  ${Number(item.pricePerUnit).toFixed(2)}
                </span>
                <span className="text-xs text-stone-500 ml-1">MXN / {item.unit}</span>
              </div>
              {item.wholesalePrice && (
                <div className="text-right">
                  <span className="text-xs font-semibold text-earth-clay-ink block">
                    Mayoreo: ${Number(item.wholesalePrice).toFixed(2)}
                  </span>
                  <span className="text-[11px] text-stone-400">
                    mín. {item.minWholesaleQuantity || 5} {item.unit}s
                  </span>
                </div>
              )}
            </div>

            <Link
              href={`/catalogo/${item.id}`}
              className="w-full min-h-[44px] inline-flex items-center justify-center rounded-lg bg-field-soft border border-field-primary/30 px-4 py-2 text-sm font-semibold text-field-primary hover:bg-field-primary hover:text-white transition-colors"
            >
              Ver detalles de la cosecha
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function CatalogoSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="rounded-xl border border-earth-border p-6 bg-earth-sand/10 animate-pulse">
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mb-4"></div>
          <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/2 mb-6"></div>
          <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 border-b border-earth-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Cosechas Disponibles
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400 max-w-2xl">
          Alimentos cultivados por pequeños productores agrícolas mexicanos. Venta por menudeo para hogares y por mayoreo para restaurantes y fruterías.
        </p>
      </div>

      <Suspense fallback={<CatalogoSkeleton />}>
        <CatalogoList />
      </Suspense>
    </div>
  );
}
