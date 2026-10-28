import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = {
  title: "Iniciar Sesión | Agrinet México",
  description: "Ingresa a tu cuenta de productor o comprador en Agrinet.",
};

async function LoginContent() {
  const session = await getSession();

  if (session) {
    redirect(session.role === "producer" ? "/panel-productor" : "/catalogo");
  }

  return <LoginForm />;
}

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-earth-sand/20">
      <Suspense fallback={<div className="w-full max-w-md h-96 rounded-xl bg-earth-sand/30 animate-pulse" />}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
