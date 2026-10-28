"use server";

import { db, products, producerProfiles } from "@/lib/db";
import { eq } from "drizzle-orm";
import { getSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export interface ProductActionResponse {
  success: boolean;
  error?: string;
}

export async function createProductAction(
  _prevState: ProductActionResponse | null,
  formData: FormData
): Promise<ProductActionResponse> {
  const session = await getSession();

  if (!session || session.role !== "producer") {
    return { success: false, error: "Debes iniciar sesión como productor para publicar cosechas." };
  }

  const name = (formData.get("name") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const category = (formData.get("category") as string) || "verduras";
  const farmingMethod = (formData.get("farmingMethod") as string) || "agroecologico";
  const unit = (formData.get("unit") as string) || "kg";
  const pricePerUnit = (formData.get("pricePerUnit") as string)?.trim();
  const wholesalePrice = (formData.get("wholesalePrice") as string)?.trim() || null;
  const minWholesaleQuantity = (formData.get("minWholesaleQuantity") as string)?.trim() || null;
  const availableQuantity = (formData.get("availableQuantity") as string)?.trim() || "10";
  const status = (formData.get("status") as string) || "disponible";

  if (!name || !pricePerUnit) {
    return { success: false, error: "El nombre de la cosecha y el precio por unidad son obligatorios." };
  }

  try {
    const profile = await db
      .select({ id: producerProfiles.id })
      .from(producerProfiles)
      .where(eq(producerProfiles.userId, session.userId))
      .limit(1);

    if (profile.length === 0) {
      return { success: false, error: "No se encontró el perfil de agricultor asociado a tu cuenta." };
    }

    const productId = crypto.randomUUID();

    await db.insert(products).values({
      id: productId,
      producerId: profile[0].id,
      name,
      description,
      category: category as "frutas" | "verduras" | "legumbres" | "granos_semillas" | "tuberculos" | "hierbas_aromaticas" | "otro",
      farmingMethod: farmingMethod as "organico" | "agroecologico" | "convencional" | "en_transicion",
      unit: unit as "kg" | "ton" | "caja" | "arpilla" | "reja" | "manojo" | "pieza",
      pricePerUnit,
      wholesalePrice,
      minWholesaleQuantity,
      availableQuantity,
      status: status as "disponible" | "en_cosecha" | "proxima_cosecha" | "agotado",
    });
  } catch (err) {
    console.error("Error al crear producto:", err);
    return { success: false, error: "No se pudo guardar la cosecha. Verifica los datos e intenta nuevamente." };
  }

  redirect("/panel-productor");
}
