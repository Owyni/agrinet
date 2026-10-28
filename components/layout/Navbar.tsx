import Link from "next/link";
import { Suspense } from "react";
import { getSession } from "@/lib/auth/session";
import { logoutAction } from "@/lib/actions/auth";
import { SproutIcon } from "@/components/ui/Icons";
import { NavbarMobileMenu } from "./NavbarMobileMenu";

async function AuthDesktopSection() {
  const session = await getSession();

  if (!session) {
    return (
      <div className="hidden md:flex items-center gap-3">
        <Link
          href="/login"
          className="min-h-[44px] px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-field-primary transition-colors flex items-center"
        >
          Iniciar Sesión
        </Link>
        <Link
          href="/register"
          className="min-h-[44px] inline-flex items-center justify-center rounded-lg bg-field-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
        >
          Registrarme
        </Link>
      </div>
    );
  }

  return (
    <div className="hidden md:flex items-center gap-3">
      <div className="flex flex-col text-right">
        <span className="text-sm font-semibold text-foreground">
          {session.fullName}
        </span>
        <span className="text-xs font-medium text-field-accent capitalize">
          {session.role === "producer"
            ? "Agricultor"
            : session.role === "commercial"
            ? "Comercial / Mayoreo"
            : "Consumidor"}
        </span>
      </div>

      {session.role === "producer" ? (
        <Link
          href="/panel-productor"
          className="min-h-[44px] inline-flex items-center justify-center rounded-lg bg-field-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
        >
          Mi Huerto
        </Link>
      ) : (
        <Link
          href="/pedidos"
          className="min-h-[44px] inline-flex items-center justify-center rounded-lg bg-field-soft border border-field-primary/20 px-4 py-2 text-sm font-semibold text-field-primary hover:bg-field-soft/80 transition-colors"
        >
          Mis Pedidos
        </Link>
      )}

      <form action={logoutAction}>
        <button
          type="submit"
          className="min-h-[44px] inline-flex items-center justify-center rounded-lg border border-earth-border px-3 py-2 text-xs font-medium text-stone-600 hover:bg-earth-sand/50 hover:text-stone-900 transition-colors"
          title="Cerrar sesión"
        >
          Salir
        </button>
      </form>
    </div>
  );
}

async function MobileMenuWrapper() {
  const session = await getSession();
  return (
    <NavbarMobileMenu
      sessionRole={session?.role || null}
      sessionName={session?.fullName || null}
    />
  );
}

function AuthFallback() {
  return (
    <div className="hidden md:flex items-center gap-3">
      <Link
        href="/login"
        className="min-h-[44px] px-3.5 py-2 text-sm font-medium text-stone-700 flex items-center"
      >
        Iniciar Sesión
      </Link>
      <Link
        href="/register"
        className="min-h-[44px] inline-flex items-center justify-center rounded-lg bg-field-primary px-4 py-2 text-sm font-semibold text-white shadow-sm"
      >
        Registrarme
      </Link>
    </div>
  );
}

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-earth-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Identidad institucional de marca */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-field-primary text-white shadow-sm transition-transform group-hover:scale-105">
              <SproutIcon className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-foreground font-serif">
                Agrinet
              </span>
              <span className="text-[11px] uppercase tracking-wider text-stone-600 font-semibold">
                Comercio del Campo Mexicano
              </span>
            </div>
          </Link>
        </div>

        {/* Navegación principal en escritorio */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            href="/"
            className="text-stone-700 hover:text-field-primary transition-colors py-2"
          >
            Inicio
          </Link>
          <Link
            href="/catalogo"
            className="text-stone-700 hover:text-field-primary transition-colors py-2"
          >
            Cosechas Disponibles
          </Link>
          <Link
            href="/productores"
            className="text-stone-700 hover:text-field-primary transition-colors py-2"
          >
            Red de Productores
          </Link>
          <Link
            href="/mayoreo"
            className="text-stone-700 hover:text-field-primary transition-colors py-2"
          >
            Restaurantes y Fruterías
          </Link>
        </nav>

        {/* Acciones de escritorio */}
        <div className="flex items-center gap-3">
          <Suspense fallback={<AuthFallback />}>
            <AuthDesktopSection />
          </Suspense>

          {/* Menú móvil */}
          <Suspense fallback={<div className="md:hidden w-10 h-10" />}>
            <MobileMenuWrapper />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
