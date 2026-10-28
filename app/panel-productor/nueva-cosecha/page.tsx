import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { NewProductForm } from "@/components/producer/NewProductForm";

export const metadata = {
  title: "Publicar Cosecha | Agrinet México",
  description: "Registra productos cosechados para venta directa en Agrinet.",
};

async function NuevaCosechaContent() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  if (session.role !== "producer") {
    redirect("/catalogo");
  }

  return <NewProductForm />;
}

export default function NuevaCosechaPage() {
  return (
    <div className="flex-1 px-4 py-8 sm:px-6 bg-earth-sand/20">
      <Suspense fallback={<div className="w-full max-w-2xl mx-auto h-96 rounded-xl bg-earth-sand/30 animate-pulse" />}>
        <NuevaCosechaContent />
      </Suspense>
    </div>
  );
}
