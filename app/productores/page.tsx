import Link from "next/link";
import { Suspense } from "react";
import { db, producerProfiles, users } from "@/lib/db";
import { eq } from "drizzle-orm";

export const metadata = {
  title: "Red de Productores Agrícolas | Agrinet México",
  description: "Conoce a las familias agricultoras y ranchos que producen tus alimentos en México.",
};

async function ProductoresList() {
  const producersList = await db
    .select({
      id: producerProfiles.id,
      farmName: producerProfiles.farmName,
      bio: producerProfiles.bio,
      story: producerProfiles.story,
      certifications: producerProfiles.certifications,
      whatsapp: producerProfiles.whatsapp,
      verified: producerProfiles.verified,
      fullName: users.fullName,
      state: users.state,
      municipality: users.municipality,
    })
    .from(producerProfiles)
    .innerJoin(users, eq(producerProfiles.userId, users.id));

  if (producersList.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-earth-border p-12 text-center bg-earth-sand/20">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-field-soft text-2xl text-field-primary mb-4">
          👨‍🌾
        </div>
        <h2 className="text-lg font-semibold text-foreground">
          Sé parte de los primeros productores en Agrinet
        </h2>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-400 max-w-md mx-auto">
          Registra tu rancho o huerto para conectar con consumidores particulares, chefs de restaurantes y fruterías que buscan producto fresco sin intermediarios.
        </p>
        <div className="mt-6">
          <Link
            href="/register?rol=productor"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-field-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
          >
            Registrar mi rancho o huerto
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {producersList.map((producer) => (
        <div
          key={producer.id}
          className="rounded-xl border border-earth-border bg-white p-6 shadow-sm dark:bg-stone-900 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-field-soft text-xl font-bold text-field-primary">
                {producer.farmName.charAt(0)}
              </div>
              <div>
                <h2 className="font-bold text-lg text-foreground">{producer.farmName}</h2>
                <p className="text-xs text-stone-500">
                  Responsable: {producer.fullName}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 dark:text-stone-400 bg-earth-sand/60 px-2.5 py-1 rounded-md mb-3">
              <span>📍</span>
              <span>
                {producer.municipality ? `${producer.municipality}, ` : ""}
                {producer.state || "México"}
              </span>
            </div>

            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              {producer.bio || "Productor comprometido con el cultivo limpio y fresco."}
            </p>
          </div>

          <div className="mt-6 border-t border-earth-border pt-4">
            <Link
              href={`/catalogo?productor=${producer.id}`}
              className="w-full min-h-[44px] inline-flex items-center justify-center rounded-lg bg-field-soft border border-field-primary/20 px-4 py-2 text-sm font-semibold text-field-primary hover:bg-field-primary hover:text-white transition-colors"
            >
              Ver cosechas de este rancho
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductoresSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((n) => (
        <div key={n} className="rounded-xl border border-earth-border p-6 bg-earth-sand/10 animate-pulse">
          <div className="h-12 w-12 rounded-full bg-stone-200 dark:bg-stone-800 mb-4"></div>
          <div className="h-5 bg-stone-200 dark:bg-stone-800 rounded w-2/3 mb-2"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mb-4"></div>
          <div className="h-10 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
        </div>
      ))}
    </div>
  );
}

export default function ProductoresPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 border-b border-earth-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Red de Agricultores y Ranchos
        </h1>
        <p className="mt-2 text-stone-600 dark:text-stone-400 max-w-2xl">
          Productores locales que cuidan la tierra y comercializan cosechas directas, promoviendo soberanía alimentaria y precio justo para el campo.
        </p>
      </div>

      <Suspense fallback={<ProductoresSkeleton />}>
        <ProductoresList />
      </Suspense>
    </div>
  );
}
