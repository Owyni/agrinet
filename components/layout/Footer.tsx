import Link from "next/link";
import { SproutIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-earth-border bg-earth-sand/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Identidad y propósito institucional */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-field-primary text-white">
                <SproutIcon className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-xl text-foreground">Agrinet México</span>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed max-w-md">
              Plataforma digital dedicada a conectar directamente a pequeñas productoras y productores agrícolas con familias, restaurantes y fruterías, fomentando precios justos y soberanía alimentaria en México.
            </p>
            <div className="text-xs text-stone-600 font-medium pt-1">
              Regiones iniciales: Michoacán, Puebla, Oaxaca, Morelos, Tlaxcala y Estado de México.
            </div>
          </div>

          {/* Enlaces de exploración */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Explorar el Campo
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/catalogo"
                  className="text-stone-700 hover:text-field-primary transition-colors py-1 inline-block"
                >
                  Cosechas de temporada
                </Link>
              </li>
              <li>
                <Link
                  href="/productores"
                  className="text-stone-700 hover:text-field-primary transition-colors py-1 inline-block"
                >
                  Directorio de productores
                </Link>
              </li>
              <li>
                <Link
                  href="/mayoreo"
                  className="text-stone-700 hover:text-field-primary transition-colors py-1 inline-block"
                >
                  Compras para restaurantes
                </Link>
              </li>
            </ul>
          </div>

          {/* Participación y registro */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900">
              Comunidad Agrinet
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/register?rol=productor"
                  className="text-stone-700 hover:text-field-primary transition-colors py-1 inline-block font-medium"
                >
                  Registrar mi huerto o rancho
                </Link>
              </li>
              <li>
                <Link
                  href="/register?rol=commercial"
                  className="text-stone-700 hover:text-field-primary transition-colors py-1 inline-block"
                >
                  Registrar negocio o frutería
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-stone-700 hover:text-field-primary transition-colors py-1 inline-block"
                >
                  Ingresar a mi cuenta
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-earth-border pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-600 gap-4">
          <p>© 2026 Agrinet. Comercio agrícola directo en México.</p>
          <div className="flex gap-4">
            <span className="text-field-primary font-semibold">Trato Directo</span>
            <span>•</span>
            <span>Sin Especulación</span>
            <span>•</span>
            <span>Trazabilidad de Huerto</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
