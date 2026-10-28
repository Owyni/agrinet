# DESIGN.md — Dirección Visual de Agrinet México

## Identidad y Concepto
**Agrinet** es un marketplace agrícola que conecta a pequeños productores mexicanos directamente con consumidores, restaurantes y fruterías.
* **Idea central:** «Del campo mexicano a tu mesa, sin rodeos.»
* **Tono:** Editorial, auténtico, profesional, cálido, arraigado en la tierra y contemporáneo. No es un dashboard SaaS genérico ni una plantilla corporativa estéril.
* **Dial settings:** ENERGY 2 (vivo pero sobrio) / RHYTHM 2 (balance de cuadrículas y composiciones editoriales) / MOTION 1 (transiciones funcionales sutiles).

---

## Paleta de Color Institucional
* **Verde Bosque Profundo (Institucional primario):** `#163828`
  * Uso: Encabezados clave, elementos principales de navegación, botones primarios.
* **Verde Hoja (Acento y acción):** `#2d6a4f` y `#40916c`
  * Uso: Estados interactivos, etiquetas de disponibilidad, acentos de frescura.
* **Verde Campo Suave (Superficies de apoyo):** `#eef5f0`
  * Uso: Insignias de categoría, fondos de contenedor secundario.
* **Fondo Marfil Cálido (Fondo de página):** `#faf8f5`
  * Uso: Base de la interfaz para evitar la frialdad del blanco puro (`#ffffff`) y evitar el modo oscuro arbitrario.
* **Superficies Claras (Tarjetas y módulos):** `#ffffff`
  * Con borde sutil `#e8e2d9` que delimita con nitidez sin proyectar sombras flotantes excesivas.
* **Terracota / Arcilla (Acento de origen y mayoreo):** `#b4533c`
  * Uso con moderación: distintivos de compras al mayoreo, origen de región, detalles de tierra.
* **Texto Neutro Alto Contraste:**
  * Primario: `#1c1917` (Stone 900, contraste > 14:1 sobre marfil, cumple ampliamente WCAG AA).
  * Secundario: `#44403c` (Stone 700, contraste > 7:1).
  * Muted/Terciario: `#57534e` (Stone 600, contraste > 4.8:1).

---

## Tipografía y Jerarquía
* **Titulares y encabezados editoriales:**
  * Tipografía con serif o grotesk editorial con presencia sólida y peso bien graduado (`font-serif` o `font-sans font-extrabold tracking-tight`).
  * En Next.js utilizamos `Geist` con interletreado estrecho (`tracking-tight`) y títulos con contraste de proporciones claro.
* **Contenido funcional y lectura:**
  * `font-sans` altamente legible, con tamaño mínimo de 14px para texto secundario y 16px para cuerpo de lectura.
* **Precios y métricas de cosecha:**
  * Cifras claras con unidad explícita (ej. `$48.00 MXN / kg`).

---

## Fotografía y Recursos Visuales
* **Fotografía:** Realista, documental, de luz natural, mostrando las manos del campesino, parcelas vivas y productos con textura real (no renders ni frutas plastificadas de banco de imágenes genérico).
* **Iconografía:** SVGs geométricos limpios y funcionales de trazo claro. **Cero emojis** como reemplazo de iconos institucionales.
* **Composición:** Módulos asimétricos equilibrados (Hero bipartito con imagen de gran formato, cuadrícula de 4 columnas para productos en desktop que colapsa con naturalidad a 2 en tablet y 1 en móvil).

---

## Principios Anti-Slop Obligatorios
1. **R-01 (Color):** Sin degradados azul-morado ni resplandores de neón.
2. **R-02 (Redacción):** Prohibido el uso del guion largo (`—`). Redacción en español mexicano natural y respetuoso.
3. **R-03 (Mobile Layout):** Diseño con reflow real en móvil, tablet y escritorio. Sin desbordamiento horizontal y con tap targets de al menos 44px.
4. **R-04 (Iconos):** Iconos de trazo vectorial que representen exactamente el concepto.
5. **R-05 (Estructura):** Secciones con ritmo editorial basadas en el contenido real del campo, no en plantillas predefinidas.
6. **R-17 y R-18 (Honestidad de datos):** Sin estadísticas falsas ("99.9% satisfacción"), sin testimonios inventados con avatares de IA.
7. **R-24 y R-26 (Navegación e Interactividad):** Cada botón y enlace tiene destino real existente en la aplicación.
8. **R-25 y R-32 (Accesibilidad Humana):** Contraste mínimo WCAG AA (4.5:1), contorno de foco `:focus-visible` nítido y navegación completa por teclado.
9. **R-27 (Estados UI):** Estados de carga, vacío y error contemplados en cada vista interactiva.
10. **R-36 y R-38 (Sin afirmaciones falsas):** El MVP aclara explícitamente que facilita el contacto y acuerdo directo; no simula pasarelas automatizadas inexistentes.
