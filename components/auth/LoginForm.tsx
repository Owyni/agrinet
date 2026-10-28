"use client";

import { useActionState } from "react";
import Link from "next/link";
import { loginAction, type ActionResponse } from "@/lib/actions/auth";

export function LoginForm() {
  const [state, formAction, isPending] = useActionState<ActionResponse | null, FormData>(
    loginAction,
    null
  );

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-white dark:bg-stone-900 border border-earth-border rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Iniciar Sesión</h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
          Ingresa para gestionar tus cosechas o consultar tus pedidos.
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

      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1"
          >
            Correo electrónico
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
          <div className="flex justify-between items-center mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              Contraseña
            </label>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Tu contraseña"
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-lg border border-earth-border bg-white dark:bg-stone-800 text-foreground placeholder-stone-400 focus:border-field-accent transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full min-h-[44px] mt-2 inline-flex items-center justify-center rounded-lg bg-field-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent disabled:opacity-60 transition-colors"
        >
          {isPending ? "Iniciando sesión..." : "Entrar a mi cuenta"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-stone-600 dark:text-stone-400 border-t border-earth-border pt-4">
        ¿Aún no tienes cuenta en Agrinet?{" "}
        <Link
          href="/register"
          className="font-semibold text-field-primary hover:text-field-accent transition-colors"
        >
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}
