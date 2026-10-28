import Link from "next/link";

export const metadata = {
  title: "Suministro Agrícola Directo para Restaurantes y Fruterías | Agrinet México",
  description: "Abastece tu negocio con cosechas directas del campo sin intermediarios ni mermas por almacenamiento excesivo.",
};

export default function MayoreoPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-bold uppercase tracking-wider text-earth-clay-ink bg-earth-sand/70 px-3 py-1 rounded-full">
          Canal Comercial y Mayoreo
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-4">
          Abastecimiento directo del campo para restaurantes, fruterías y comedores
        </h1>
        <p className="mt-4 text-base text-stone-600 dark:text-stone-400 leading-relaxed">
          Evita las mermas de días en bodegas intermedias y la especulación de precios. Conecta directamente con agricultores de confianza en Puebla, Michoacán, Oaxaca, Morelos y regiones agrícolas clave.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-xl border border-earth-border bg-white dark:bg-stone-900 p-6 shadow-sm">
          <div className="text-2xl mb-3">⏱️</div>
          <h2 className="font-bold text-lg text-foreground mb-2">Frescura de 24 a 48 horas</h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Las hortalizas, frutas y hierbas se cortan según la programación de tu pedido, garantizando mayor vida de anaquel en tu cocina o frutería.
          </p>
        </div>

        <div className="rounded-xl border border-earth-border bg-white dark:bg-stone-900 p-6 shadow-sm">
          <div className="text-2xl mb-3">📦</div>
          <h2 className="font-bold text-lg text-foreground mb-2">Precios por volumen y caja</h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Precios mayoristas definidos transparentemente por kilo, caja o arpilla. Ahorro para tu negocio y pago justo para el agricultor.
          </p>
        </div>

        <div className="rounded-xl border border-earth-border bg-white dark:bg-stone-900 p-6 shadow-sm">
          <div className="text-2xl mb-3">💬</div>
          <h2 className="font-bold text-lg text-foreground mb-2">Coordinación por WhatsApp</h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Acuerda detalles de flete, puntos de entrega o pagos SPEI de forma ágil y directa con el productor responsable.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-field-soft/60 border border-field-primary/20 p-8 text-center">
        <h2 className="text-2xl font-bold text-field-primary">¿Gestionas compras de un restaurante o frutería?</h2>
        <p className="mt-2 text-sm text-stone-700 dark:text-stone-300 max-w-xl mx-auto">
          Crea tu cuenta comercial para acceder a listas de precios por volumen y programar entregas recurrentes semanales.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/register?rol=commercial"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-field-primary px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
          >
            Registrar cuenta comercial
          </Link>
          <Link
            href="/catalogo"
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-earth-border bg-white dark:bg-stone-800 px-6 py-2.5 text-sm font-medium text-stone-800 dark:text-stone-100 hover:bg-stone-50 transition-colors"
          >
            Ver cosechas actuales
          </Link>
        </div>
      </div>
    </div>
  );
}
