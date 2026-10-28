"use client";

import { useState, useActionState } from "react";
import Link from "next/link";
import { registerAction, type ActionResponse } from "@/lib/actions/auth";

const ESTADOS_MEXICO = [
  "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas",
  "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Guanajuato",
  "Guerrero", "Hidalgo", "Jalisco", "Estado de México", "Michoacán", "Morelos",
  "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
  "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala",
  "Veracruz", "Yucatán", "Zacatecas"
];

interface RegisterFormProps {
  initialRole?: string;
}

export function RegisterForm({ initialRole = "consumer" }: RegisterFormProps) {
  const [role, setRole] = useState<string>(
    ["producer", "commercial", "consumer"].includes(initialRole) ? initialRole : "consumer"
  );
  const [state, formAction, isPending] = useActionState<ActionResponse | null, FormData>(
    registerAction,
    null
  );

  return (
    <div className="w-full max-w-xl mx-auto p-6 sm:p-8 bg-white dark:bg-stone-900 border border-earth-border rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Crear Cuenta en Agrinet</h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Elige cómo deseas participar en la red de comercio directo del campo.
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

      {/* Selector de rol */}
      <div className="mb-6">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
          Tipo de cuenta
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setRole("consumer")}
            className={`min-h-[44px] px-3 py-2.5 rounded-lg border text-sm font-medium transition-all text-left flex flex-col justify-center ${
              role === "consumer"
                ? "border-field-primary bg-field-soft text-field-primary font-semibold ring-1 ring-field-primary"
                : "border-earth-border text-stone-700 dark:text-stone-300 hover:border-stone-400"
            }`}
          >
            <span>Consumidor</span>
            <span className="text-xs text-stone-500 font-normal">Hogares y familias</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("producer")}
            className={`min-h-[44px] px-3 py-2.5 rounded-lg border text-sm font-medium transition-all text-left flex flex-col justify-center ${
              role === "producer"
                ? "border-field-primary bg-field-soft text-field-primary font-semibold ring-1 ring-field-primary"
                : "border-earth-border text-stone-700 dark:text-stone-300 hover:border-stone-400"
            }`}
          >
            <span>Agricultor</span>
            <span className="text-xs text-stone-500 font-normal">Vender mi cosecha</span>
          </button>

          <button
            type="button"
            onClick={() => setRole("commercial")}
            className={`min-h-[44px] px-3 py-2.5 rounded-lg border text-sm font-medium transition-all text-left flex flex-col justify-center ${
              role === "commercial"
                ? "border-field-primary bg-field-soft text-field-primary font-semibold ring-1 ring-field-primary"
                : "border-earth-border text-stone-700 dark:text-stone-300 hover:border-stone-400"
            }`}
          >
            <span>Restaurante/Frutería</span>
            <span className="text-xs text-stone-500 font-normal">Compra en volumen</span>
          </button>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="role" value={role} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Nombre completo *
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              placeholder="Ej. María Elena Morales"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Teléfono / WhatsApp *
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              placeholder="Ej. 222 123 4567"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
            />
          </div>
        </div>

        {/* Campos condicionales por rol */}
        {role === "producer" && (
          <div className="p-4 rounded-lg bg-field-soft/40 border border-field-primary/20 space-y-3">
            <h3 className="text-sm font-semibold text-field-primary">
              Información de tu Unidad de Producción
            </h3>
            <div>
              <label
                htmlFor="farmName"
                className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
              >
                Nombre de tu rancho, huerto o cooperativa
              </label>
              <input
                id="farmName"
                name="farmName"
                type="text"
                placeholder="Ej. Rancho San Isidro, Huerto La Esperanza"
                className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground text-sm"
              />
            </div>
          </div>
        )}

        {role === "commercial" && (
          <div className="p-4 rounded-lg bg-earth-sand/40 border border-earth-border space-y-3">
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">
              Datos del Establecimiento Comercial
            </h3>
            <div>
              <label
                htmlFor="businessName"
                className="block text-xs font-medium text-stone-700 dark:text-stone-300 mb-1"
              >
                Nombre del restaurante, frutería o negocio
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                placeholder="Ej. Restaurante Tierra Mestiza, Frutería El Canario"
                className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground text-sm"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="state"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Estado de la República
            </label>
            <select
              id="state"
              name="state"
              defaultValue="Puebla"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground focus:border-field-accent transition-colors"
            >
              {ESTADOS_MEXICO.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="municipality"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
            >
              Municipio / Alcaldía
            </label>
            <input
              id="municipality"
              name="municipality"
              type="text"
              placeholder="Ej. Atlixco, Uruapan, Texcoco"
              className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
          >
            Correo electrónico *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="ejemplo@correo.com"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
          >
            Contraseña (mínimo 6 caracteres) *
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            placeholder="Crea una contraseña segura"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[44px] mt-4 inline-flex items-center justify-center rounded-lg bg-field-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent disabled:opacity-60 transition-colors"
        >
          {isPending ? "Registrando tu cuenta..." : "Completar Registro"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-stone-600 dark:text-stone-400 border-t border-earth-border pt-4">
        ¿Ya tienes una cuenta registrada?{" "}
        <Link
          href="/login"
          className="font-semibold text-field-primary hover:text-field-accent transition-colors"
        >
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}
