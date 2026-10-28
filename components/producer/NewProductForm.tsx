"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createProductAction, type ProductActionResponse } from "@/lib/actions/products";

export function NewProductForm() {
  const [state, formAction, isPending] = useActionState<ProductActionResponse | null, FormData>(
    createProductAction,
    null
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-white dark:bg-stone-900 border border-earth-border rounded-xl shadow-sm">
      <div className="mb-6 border-b border-earth-border pb-4">
        <h1 className="text-2xl font-bold text-foreground">Publicar Nueva Cosecha</h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Registra el producto agrícola disponible en tu huerto para venta directa.
        </p>
      </div>

      {state?.error && (
        <div
          role="alert"
          className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm dark:bg-red-950/40 dark:border-red-800 dark:text-red-300"
        >
          {state.error}
        </div>
      )}

      <form action={formAction} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
            Nombre de la cosecha o cultivo *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Ej. Jitomate Saladet, Aguacate Hass criollo, Nopal verdura"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
              Categoría agrícola *
            </label>
            <select
              id="category"
              name="category"
              defaultValue="verduras"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground focus:border-field-accent transition-colors"
            >
              <option value="verduras">Verduras y hortalizas</option>
              <option value="frutas">Frutas</option>
              <option value="legumbres">Legumbres</option>
              <option value="granos_semillas">Granos y semillas</option>
              <option value="tuberculos">Tubérculos y raíces</option>
              <option value="hierbas_aromaticas">Hierbas aromáticas</option>
              <option value="otro">Otro producto del campo</option>
            </select>
          </div>

          <div>
            <label htmlFor="farmingMethod" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
              Método de cultivo *
            </label>
            <select
              id="farmingMethod"
              name="farmingMethod"
              defaultValue="agroecologico"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground focus:border-field-accent transition-colors"
            >
              <option value="agroecologico">Agroecológico (sin químicos sintéticos)</option>
              <option value="organico">Orgánico certificado</option>
              <option value="en_transicion">En transición agroecológica</option>
              <option value="convencional">Convencional</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
              Unidad de venta *
            </label>
            <select
              id="unit"
              name="unit"
              defaultValue="kg"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground focus:border-field-accent transition-colors"
            >
              <option value="kg">Kilo (kg)</option>
              <option value="caja">Caja</option>
              <option value="arpilla">Arpilla / Costal</option>
              <option value="reja">Reja</option>
              <option value="manojo">Manojo</option>
              <option value="pieza">Pieza</option>
              <option value="ton">Tonelada</option>
            </select>
          </div>

          <div>
            <label htmlFor="pricePerUnit" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
              Precio al menudeo ($ MXN) *
            </label>
            <input
              id="pricePerUnit"
              name="pricePerUnit"
              type="number"
              step="0.50"
              required
              placeholder="Ej. 28.00"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
            />
          </div>

          <div>
            <label htmlFor="availableQuantity" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
              Cantidad disponible *
            </label>
            <input
              id="availableQuantity"
              name="availableQuantity"
              type="number"
              step="1"
              required
              defaultValue="50"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
            />
          </div>
        </div>

        {/* Sección de mayoreo */}
        <div className="p-4 rounded-lg bg-earth-sand/30 border border-earth-border space-y-3">
          <h2 className="text-sm font-semibold text-foreground">
            Opción de Mayoreo (Para restaurantes y fruterías)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="wholesalePrice" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Precio mayoreo ($ MXN opcional)
              </label>
              <input
                id="wholesalePrice"
                name="wholesalePrice"
                type="number"
                step="0.50"
                placeholder="Ej. 20.00"
                className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground text-sm"
              />
            </div>
            <div>
              <label htmlFor="minWholesaleQuantity" className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Volumen mínimo para mayoreo
              </label>
              <input
                id="minWholesaleQuantity"
                name="minWholesaleQuantity"
                type="number"
                step="1"
                placeholder="Ej. 10 cajas o 50 kg"
                className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">
            Descripción y detalles de corte
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Indica variedad, estado de maduración, tiempo de corte o detalles de empaque."
            className="w-full p-3 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-lg bg-field-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent disabled:opacity-60 transition-colors"
          >
            {isPending ? "Guardando cosecha..." : "Publicar Cosecha en el Catálogo"}
          </button>
          <Link
            href="/panel-productor"
            className="min-h-[44px] inline-flex items-center justify-center rounded-lg border border-earth-border px-5 py-2.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
