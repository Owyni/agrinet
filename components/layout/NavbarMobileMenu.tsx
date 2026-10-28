"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MenuIcon, CloseIcon } from "@/components/ui/Icons";

interface NavbarMobileMenuProps {
  sessionRole?: string | null;
  sessionName?: string | null;
}

export function NavbarMobileMenu({ sessionRole, sessionName }: NavbarMobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Cerrar menú con tecla Escape para accesibilidad (R-32 & antislop-human)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Bloquear scroll de fondo cuando el menú esté abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
        className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-lg border border-earth-border p-2 text-stone-700 hover:bg-earth-sand/50 transition-colors"
      >
        {isOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-x-0 top-[65px] bottom-0 z-50 bg-background border-t border-earth-border p-6 flex flex-col justify-between overflow-y-auto"
        >
          <nav className="flex flex-col space-y-4 text-base font-medium">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="min-h-[44px] flex items-center px-3 py-2 rounded-lg text-foreground hover:bg-field-soft/60 hover:text-field-primary transition-colors"
            >
              Inicio
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setIsOpen(false)}
              className="min-h-[44px] flex items-center px-3 py-2 rounded-lg text-foreground hover:bg-field-soft/60 hover:text-field-primary transition-colors"
            >
              Cosechas Disponibles
            </Link>
            <Link
              href="/productores"
              onClick={() => setIsOpen(false)}
              className="min-h-[44px] flex items-center px-3 py-2 rounded-lg text-foreground hover:bg-field-soft/60 hover:text-field-primary transition-colors"
            >
              Red de Productores
            </Link>
            <Link
              href="/mayoreo"
              onClick={() => setIsOpen(false)}
              className="min-h-[44px] flex items-center px-3 py-2 rounded-lg text-foreground hover:bg-field-soft/60 hover:text-field-primary transition-colors"
            >
              Restaurantes y Fruterías (Mayoreo)
            </Link>
          </nav>

          <div className="pt-6 border-t border-earth-border flex flex-col gap-3">
            {sessionName ? (
              <div className="space-y-3">
                <div className="px-3 py-2 rounded-lg bg-earth-sand/40">
                  <span className="text-xs text-stone-500 block">Cuenta activa</span>
                  <span className="font-semibold text-sm text-foreground">{sessionName}</span>
                </div>
                {sessionRole === "producer" ? (
                  <Link
                    href="/panel-productor"
                    onClick={() => setIsOpen(false)}
                    className="min-h-[44px] w-full flex items-center justify-center rounded-lg bg-field-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
                  >
                    Mi Huerto
                  </Link>
                ) : (
                  <Link
                    href="/pedidos"
                    onClick={() => setIsOpen(false)}
                    className="min-h-[44px] w-full flex items-center justify-center rounded-lg bg-field-soft border border-field-primary/30 px-4 py-2.5 text-sm font-semibold text-field-primary transition-colors"
                  >
                    Mis Pedidos
                  </Link>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] flex items-center justify-center rounded-lg border border-earth-border px-4 py-2.5 text-sm font-medium text-foreground hover:bg-earth-sand/40 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="min-h-[44px] flex items-center justify-center rounded-lg bg-field-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-field-accent transition-colors"
                >
                  Registrarme en Agrinet
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
