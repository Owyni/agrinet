"use server";

import { db, users, producerProfiles } from "@/lib/db";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, destroySession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export interface ActionResponse {
  success: boolean;
  error?: string;
}

export async function registerAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const fullName = (formData.get("fullName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const phone = (formData.get("phone") as string)?.trim();
  const role = (formData.get("role") as string) || "consumer";
  const state = (formData.get("state") as string)?.trim() || "";
  const municipality = (formData.get("municipality") as string)?.trim() || "";
  const farmName = (formData.get("farmName") as string)?.trim() || "";
  const businessName = (formData.get("businessName") as string)?.trim() || "";

  if (!fullName || !email || !password || !phone) {
    return { success: false, error: "Todos los campos obligatorios deben ser completados." };
  }

  if (password.length < 6) {
    return { success: false, error: "La contraseña debe tener al menos 6 caracteres." };
  }

  const validRoles = ["producer", "consumer", "commercial"];
  if (!validRoles.includes(role)) {
    return { success: false, error: "El tipo de cuenta seleccionado no es válido." };
  }

  try {
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      return { success: false, error: "Ya existe una cuenta registrada con este correo electrónico." };
    }

    const userId = crypto.randomUUID();
    const passwordHash = await hashPassword(password);

    await db.insert(users).values({
      id: userId,
      email,
      passwordHash,
      fullName,
      phone,
      role: role as "producer" | "consumer" | "commercial",
      businessName: role === "commercial" ? businessName || fullName : null,
      state: state || null,
      municipality: municipality || null,
    });

    if (role === "producer") {
      const profileId = crypto.randomUUID();
      await db.insert(producerProfiles).values({
        id: profileId,
        userId,
        farmName: farmName || `Finca de ${fullName}`,
        whatsapp: phone,
        bio: `Productor local de alimentos frescos ubicado en ${municipality ? `${municipality}, ` : ""}${state || "México"}.`,
      });
    }

    await createSession({
      userId,
      email,
      fullName,
      role: role as "producer" | "consumer" | "commercial",
    });
  } catch (err) {
    console.error("Error en registerAction:", err);
    return { success: false, error: "Ocurrió un error al registrar la cuenta. Inténtalo de nuevo." };
  }

  redirect(role === "producer" ? "/panel-productor" : "/catalogo");
}

export async function loginAction(
  _prevState: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: false, error: "Ingresa tu correo y contraseña." };
  }

  let userRole = "consumer";

  try {
    const userList = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (userList.length === 0) {
      return { success: false, error: "Correo o contraseña incorrectos." };
    }

    const user = userList[0];
    const passwordMatch = await verifyPassword(password, user.passwordHash);

    if (!passwordMatch) {
      return { success: false, error: "Correo o contraseña incorrectos." };
    }

    userRole = user.role;

    await createSession({
      userId: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role as "producer" | "consumer" | "commercial",
    });
  } catch (err) {
    console.error("Error en loginAction:", err);
    return { success: false, error: "Error de autenticación. Intenta nuevamente." };
  }

  redirect(userRole === "producer" ? "/panel-productor" : "/catalogo");
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect("/");
}
