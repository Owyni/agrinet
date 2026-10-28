import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db, producerProfiles, products, users } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export const metadata = {
  title: "Panel del Productor | Agrinet México",
  description: "Administra las cosechas de tu huerto o rancho y consulta los pedidos recibidos.",
};

async function PanelProductorContent() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "producer") {
    redirect("/catalogo");
  }

  const profile = await db
    .select({
      id: producerProfiles.id,
      farmName: producerProfiles.farmName,
      bio: producerProfiles.bio,
      whatsapp: producerProfiles.whatsapp,
      verified: producerProfiles.verified,
      state: users.state,
      municipality: users.municipality,
    })
    .from(producerProfiles)
    .innerJoin(users, eq(producerProfiles.userId, users.id))
    .where(eq(producerProfiles.userId, session.userId))
    .limit(1);

  const producer = profile[0];

  const myProducts = producer
    ? await db
        .select()
        .from(products)
        .where(eq(products.producerId, producer.id))
        .orderBy(desc(products.createdAt))
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Encabezado del Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-earth-border pb-6 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-field-accent bg-field-soft px-3 py-1 rounded-full mb-2">
            Panel de Agricultor
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {producer?.farmName || "Mi Huerto"}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            Ubicación: {producer?.municipality ? `${producer.municipality}, ` : ""}{producer?.state || "México"} • Contacto WhatsApp: {producer?.whatsapp || "No registrado"}
          </p>
        </div>

        <Link
          href="/panel-productor/nueva-cosecha"
          className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-field-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
        >
          + Publicar Nueva Cosecha
        </Link>
      </div>

      {/* Resumen de actividad */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
        <div className="p-5 rounded-xl border border-earth-border bg-white dark:bg-stone-900 shadow-sm">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Cosechas Publicadas</span>
          <p className="text-3xl font-bold text-foreground mt-2">{myProducts.length}</p>
        </div>
        <div className="p-5 rounded-xl border border-earth-border bg-white dark:bg-stone-900 shadow-sm">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Pedidos Recibidos</span>
          <p className="text-3xl font-bold text-field-primary mt-2">0</p>
        </div>
        <div className="p-5 rounded-xl border border-earth-border bg-white dark:bg-stone-900 shadow-sm">
          <span className="text-xs font-medium text-stone-500 uppercase tracking-wider">Estatus de Productor</span>
          <p className="text-base font-semibold text-stone-800 dark:text-stone-200 mt-3 flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            Activo en la red directa
          </p>
        </div>
      </div>

      {/* Lista de Cosechas */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Mis Cosechas en Venta</h2>
        {myProducts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-earth-border p-10 text-center bg-earth-sand/20">
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              Aún no has registrado ninguna cosecha disponible.
            </p>
            <p className="text-xs text-stone-500 mt-1">
              Publica jitomates, aguacates, hortalizas, maíz o lo que estés cosechando para recibir pedidos directos.
            </p>
            <div className="mt-5">
              <Link
                href="/panel-productor/nueva-cosecha"
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-field-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
              >
                Registrar mi primera cosecha
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProducts.map((p) => (
              <div
                key={p.id}
                className="p-5 rounded-xl border border-earth-border bg-white dark:bg-stone-900 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-field-primary capitalize">{p.category}</span>
                    <span className="capitalize">{p.status}</span>
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{p.name}</h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Disponible: {Number(p.availableQuantity)} {p.unit}s
                  </p>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 line-clamp-2">
                    {p.description || "Sin descripción adicional."}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-earth-border flex justify-between items-center">
                  <span className="font-bold text-lg text-field-primary">
                    ${Number(p.pricePerUnit).toFixed(2)} MXN / {p.unit}
                  </span>
                  <span className="text-xs text-stone-500 capitalize">{p.farmingMethod}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PanelProductorPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-12 animate-pulse h-96 bg-earth-sand/20 rounded-xl" />}>
      <PanelProductorContent />
    </Suspense>
  );
}
