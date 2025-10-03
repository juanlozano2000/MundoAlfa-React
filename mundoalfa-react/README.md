#MundoAlfa — E-commerce de repuestos Alfa Romeo

Tienda demo para explorar productos y compatibilidades de Alfa Romeo. Construida con Next.js (App Router), TypeScript, Tailwind, y SQLite para persistencia simple.

Repo: MundoAlfa-React/mundoalfa-react
Demo: pendiente

✨ Características

🧭 Explorar productos con búsqueda y filtros por modelo y categoría

🖼️ Imágenes desde /public/images/*

🗃️ SQLite en data/mundoAlfa.db (cero dependencias externas)

⚡ API Routes para models, categories, products y products/:id

🧱 UI con Tailwind + estados de carga (skeletons)

🚀 Deploy en Netlify (config batteries-included)

🧩 Stack

Framework: Next.js 15 (App Router, Server/Client Components)

Lenguaje: TypeScript

Estilos: Tailwind CSS

DB: SQLite (archivo en data/mundoAlfa.db)

Hosting: Netlify (@netlify/plugin-nextjs)

🗂️ Estructura
mundoalfa-react/
├─ app/
│  ├─ page.tsx
│  ├─ explorar/
│  │  ├─ page.tsx                 # Server component (Suspense)
│  │  └─ ExplorarContent.tsx      # Client component (useSearchParams)
│  └─ api/
│     ├─ models/route.ts
│     ├─ categories/route.ts
│     └─ products/
│        ├─ route.ts
│        └─ [id]/route.ts
├─ components/
│  └─ FiltersBar.tsx
├─ data/
│  └─ mundoAlfa.db                # SQLite database
├─ lib/
│  └─ db.ts                       # conexión a SQLite (better-sqlite3)
├─ public/
│  └─ images/ (pastillas.png, discos.png, bujias.png, amortiguadores.png)
├─ netlify.toml
└─ package.json

🧠 Modelo de datos (simplificado)

models: { id, name }

categories: { id, name }

products: { id, category_id, base_name, brand, description, image, sku, model_id, price, currency }

Nota: Se eliminó la tabla fitments. La compatibilidad se resuelve con products.model_id.

▶️ Arranque local
cd mundoalfa-react
npm i
npm run dev
# abre http://localhost:3000


Asegurate de tener el archivo data/mundoAlfa.db (incluido en el repo).
Si cambiás la ruta, ajustá lib/db.ts.

Ejemplo de db.ts:

import path from "path";
import Database from "better-sqlite3";

const dbPath = path.join(process.cwd(), "data", "mundoAlfa.db");
export const db = new Database(dbPath);

🔌 Endpoints

GET /api/models → [{ id, name }]

GET /api/categories?model=<name> → categorías disponibles para el modelo (por nombre)
GET /api/categories → todas

GET /api/products?model=<name>&category=<id>&q=<text> → productos filtrados

GET /api/products/:id → detalle de un producto

Respuesta de producto (listado):

{
  "id": 1,
  "base_name": "Pastillas de freno (Giulietta)",
  "brand": "MarcaDemo",
  "image": "pastillas.png",
  "sku": "PAST-002-ALFAROMEOGIULIETTA",
  "category": "Pastillas de freno",
  "price": 135000,
  "currency": "ARS",
  "model": "Alfa Romeo Giulietta"
}

🌱 Seeds (datos de ejemplo)

Ejemplo de inserts (reutilizando imágenes y marca):

-- Categoría y modelo deben existir
INSERT INTO products (category_id, base_name, brand, description, image, sku, model_id, price, currency)
SELECT c.id, 'Pastillas semimetálicas (Alfa Romeo Giulia)', 'MarcaDemo',
       'Compuesto semimetálico con buena mordida en frío', 'pastillas.png',
       'PAST-002-ALFAROMEOGIULIA', m.id, 135000, 'ARS'
FROM categories c, models m
WHERE c.name='Pastillas de freno' AND m.name='Alfa Romeo Giulia'
  AND NOT EXISTS (SELECT 1 FROM products WHERE sku='PAST-002-ALFAROMEOGIULIA');


Más ejemplos en docs/seeds.sql (opcional).

🧪 Scripts
# Desarrollo
npm run dev

# Build de producción
npm run build

# Lint / Types
npm run lint

☁️ Deploy en Netlify

netlify.toml (si el archivo está dentro de mundoalfa-react/):

[build]
  base    = "mundoalfa-react"
  command = "npm run build"
  publish = ".next"

[functions]
  included_files = ["data/mundoAlfa.db"]

[[plugins]]
  package = "@netlify/plugin-nextjs"


En el panel de Netlify:

Branch: main

Base directory: mundoalfa-react

Build command: npm run build

Publish directory: .next

La base de datos se empaqueta en las serverless functions gracias a included_files.

🧯 Troubleshooting

404 en /api/categories
La carpeta debe llamarse app/api/categories (no categoris 🙃).

useSearchParams() error / Suspense
En App Router, el componente que usa useSearchParams debe ir bajo <Suspense>.
Patrón usado: app/explorar/page.tsx (Server) + ExplorarContent.tsx (Client).

TypeScript: “Unexpected any”
Tipar arrays y callbacks (ej. ProductRow[], (r: ProductRow) => …).
Evitá any en handlers y en filtros.

Warnings de <img>
Son avisos Core Web Vitals. Podés migrar a next/image más adelante.

SQLite read-only en Netlify
Archivos incluidos en funciones son solo lectura. Si necesitás escritura, usá una DB externa.

🗺️ Roadmap

 Migrar <img> → next/image

 Paginación e infinite scroll

 Carrito y checkout (mock)

 Tests (Playwright/RTL)

 CI con GitHub Actions

📜 Licencia

MIT © 2025 — MundoAlfa-React

¿Ideas o feedback? ¡Abrí un issue o PR! 🚀
