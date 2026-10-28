import { pgTable, text, timestamp, numeric, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  fullName: text("full_name").notNull(),
  phone: text("phone").notNull(),
  role: text("role", { enum: ["producer", "consumer", "commercial"] }).notNull().default("consumer"),
  businessName: text("business_name"),
  rfc: text("rfc"),
  state: text("state"),
  municipality: text("municipality"),
  address: text("address"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const producerProfiles = pgTable("producer_profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  farmName: text("farm_name").notNull(),
  bio: text("bio"),
  story: text("story"),
  certifications: text("certifications"),
  deliveryOptions: text("delivery_options"),
  whatsapp: text("whatsapp"),
  locationLat: numeric("location_lat", { precision: 10, scale: 7 }),
  locationLng: numeric("location_lng", { precision: 10, scale: 7 }),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const products = pgTable("products", {
  id: text("id").primaryKey(),
  producerId: text("producer_id").notNull().references(() => producerProfiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  category: text("category", { 
    enum: ["frutas", "verduras", "legumbres", "granos_semillas", "tuberculos", "hierbas_aromaticas", "otro"] 
  }).notNull().default("verduras"),
  farmingMethod: text("farming_method", {
    enum: ["organico", "agroecologico", "convencional", "en_transicion"]
  }).notNull().default("agroecologico"),
  unit: text("unit", {
    enum: ["kg", "ton", "caja", "arpilla", "reja", "manojo", "pieza"]
  }).notNull().default("kg"),
  pricePerUnit: numeric("price_per_unit", { precision: 10, scale: 2 }).notNull(),
  wholesalePrice: numeric("wholesale_price", { precision: 10, scale: 2 }),
  minWholesaleQuantity: numeric("min_wholesale_quantity", { precision: 10, scale: 2 }),
  availableQuantity: numeric("available_quantity", { precision: 10, scale: 2 }).notNull().default("0"),
  status: text("status", {
    enum: ["disponible", "en_cosecha", "proxima_cosecha", "agotado"]
  }).notNull().default("disponible"),
  harvestDate: timestamp("harvest_date", { withTimezone: true }),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  buyerId: text("buyer_id").notNull().references(() => users.id),
  producerId: text("producer_id").notNull().references(() => producerProfiles.id),
  status: text("status", {
    enum: ["pendiente", "confirmado", "en_preparacion", "en_camino", "entregado", "cancelado"]
  }).notNull().default("pendiente"),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentMethod: text("payment_method", {
    enum: ["transferencia_spei", "contra_entrega", "tarjeta", "acordar_con_productor"]
  }).notNull().default("acordar_con_productor"),
  paymentStatus: text("payment_status", {
    enum: ["pendiente", "pagado", "reembolsado"]
  }).notNull().default("pendiente"),
  deliveryAddress: text("delivery_address").notNull(),
  deliveryNotes: text("delivery_notes"),
  buyerPhone: text("buyer_phone").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id, { onDelete: "cascade" }),
  productId: text("product_id").notNull().references(() => products.id),
  productName: text("product_name").notNull(),
  quantity: numeric("quantity", { precision: 10, scale: 2 }).notNull(),
  unit: text("unit").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
});

// Relaciones
export const usersRelations = relations(users, ({ one, many }) => ({
  producerProfile: one(producerProfiles, {
    fields: [users.id],
    references: [producerProfiles.userId],
  }),
  orders: many(orders),
}));

export const producerProfilesRelations = relations(producerProfiles, ({ one, many }) => ({
  user: one(users, {
    fields: [producerProfiles.userId],
    references: [users.id],
  }),
  products: many(products),
  orders: many(orders),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  producer: one(producerProfiles, {
    fields: [products.producerId],
    references: [producerProfiles.id],
  }),
  orderItems: many(orderItems),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  buyer: one(users, {
    fields: [orders.buyerId],
    references: [users.id],
  }),
  producer: one(producerProfiles, {
    fields: [orders.producerId],
    references: [producerProfiles.id],
  }),
  items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type ProducerProfile = typeof producerProfiles.$inferSelect;
export type NewProducerProfile = typeof producerProfiles.$inferInsert;
export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type OrderItem = typeof orderItems.$inferSelect;
export type NewOrderItem = typeof orderItems.$inferInsert;
