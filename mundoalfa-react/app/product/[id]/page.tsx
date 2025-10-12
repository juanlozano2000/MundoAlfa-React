import Link from "next/link";
import { headers } from "next/headers";

type Product = {
  id: number;
  base_name: string;
  brand: string | null;
  image: string | null;
  sku: string | null;
  category: string | null;
  price: number | null;
  currency: string | null;
  model?: string | null;
  description?: string | null;
};

async function getBaseUrl() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "production" ? "https" : "http");
  if (!host) return process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
  return `${proto}://${host}`;
}

async function getProduct(id: string) {
  const base = await getBaseUrl();
  const res = await fetch(`${base}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  const data = (await res.json()) as { product: Product | null };
  return data.product ?? null;
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link
          href="/explorar"
          className="mb-4 inline-block rounded-lg border border-gray-400 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-600 hover:text-gray-900 transition"
        >
          ← Volver a explorar
        </Link>
        <p className="text-neutral-600">Producto no encontrado.</p>
      </main>
    );
  }

  const ItemDetails = (await import("@/components/ItemDetails")).default;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <Link
        href="/explorar"
        className="mb-4 inline-block rounded-lg border border-gray-400 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-600 hover:text-gray-900 transition"
      >
        ← Volver a explorar
      </Link>
      <ItemDetails product={product} />
    </main>
  );
}
