import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { db, orders } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";

export const metadata = {
  title: "Mis Pedidos | Agrinet México",
  description: "Historial y seguimiento de pedidos de cosechas en Agrinet.",
};

async function PedidosContent() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const myOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.buyerId, session.userId))
    .orderBy(desc(orders.createdAt));

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="border-b border-earth-border pb-6 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Mis Pedidos</h1>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
          Consulta tus pedidos directos a huertos y agricultores locales.
        </p>
      </div>

      {myOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-earth-border p-12 text-center bg-earth-sand/20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-field-soft text-2xl text-field-primary mb-4">
            📦
          </div>
          <h2 className="text-lg font-semibold text-foreground">Aún no has realizado pedidos</h2>
          <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
            Explora las cosechas disponibles directamente de los productores para comprar alimentos frescos del campo.
          </p>
          <div className="mt-6">
            <Link
              href="/catalogo"
              className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-field-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
            >
              Explorar cosechas de temporada
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div
              key={order.id}
              className="p-5 rounded-xl border border-earth-border bg-white dark:bg-stone-900 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <span className="text-xs font-mono font-semibold text-field-accent">
                  {order.orderNumber}
                </span>
                <p className="text-sm text-stone-500 mt-1">
                  Fecha: {new Date(order.createdAt).toLocaleDateString("es-MX")}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                  Dirección: {order.deliveryAddress}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-lg font-bold text-foreground block">
                    ${Number(order.totalAmount).toFixed(2)} MXN
                  </span>
                  <span className="text-xs font-medium text-stone-500 capitalize">
                    Estatus: {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function PedidosPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-5xl px-4 py-12 animate-pulse h-96 bg-earth-sand/20 rounded-xl" />}>
      <PedidosContent />
    </Suspense>
  );
}
