import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = {
  title: "Registro de Productores y Compradores | Agrinet México",
  description: "Únete a Agrinet y comercializa cosechas directamente del campo al consumidor.",
};

interface RegisterPageProps {
  searchParams: Promise<{ rol?: string }>;
}

async function RegisterContent({ searchParams }: RegisterPageProps) {
  const session = await getSession();

  if (session) {
    redirect(session.role === "producer" ? "/panel-productor" : "/catalogo");
  }

  const resolvedParams = await searchParams;
  const initialRole = resolvedParams?.rol || "consumer";

  return <RegisterForm initialRole={initialRole} />;
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-earth-sand/20">
      <Suspense fallback={<div className="w-full max-w-xl h-96 rounded-xl bg-earth-sand/30 animate-pulse" />}>
        <RegisterContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
