"use client";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltersBar from "../../components/FiltersBar";

type Product = {
  id: number;
  base_name: string;
  brand: string | null;
  image: string | null;
  sku: string | null;
  category: string | null;
  price: number | null;
  currency: string | null;
  model?: string | null;        // si el endpoint devuelve el nombre del modelo
  description?: string | null;  // opcional si lo devolvés en /api/products/[id]
};

export default function Explorar() {
  const sp = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    model: sp.get("model"),
    category: sp.get("category") ? Number(sp.get("category")) : null, // 👈 number|null
    q: sp.get("q") || "",
  });
  const [rows, setRows] = useState<Product[]>([]);
  const [pid, setPid] = useState<number | null>(sp.get("pid") ? Number(sp.get("pid")) : null);
  const [detail, setDetail] = useState<{ product: Product } | null>(null);

  // querystring de filtros
  const qs = useMemo(() => {
    const p = new URLSearchParams();
    if (filters.model) p.set("model", filters.model);
    if (filters.category != null) p.set("category", String(filters.category)); // 👈 num -> str
    if (filters.q) p.set("q", filters.q);
    return p.toString();
  }, [filters]);

  // fetch de productos
  useEffect(() => {
    fetch(`/api/products?${qs}`).then(r => r.json()).then(setRows);
    // limpiar detalle al cambiar filtros
    setPid(null);
    setDetail(null);
    router.replace(`/explorar?${qs}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qs]);

  // fetch de detalle
  useEffect(() => {
    if (pid) {
      fetch(`/api/products/${pid}`).then(r => r.json()).then(setDetail);
      const p = new URLSearchParams(qs); p.set("pid", String(pid));
      router.replace(`/explorar?${p.toString()}`);
    } else {
      router.replace(`/explorar?${qs}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pid]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <Link
        href="/"
        className="mb-4 inline-block rounded-lg border border-gray-400 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-600 hover:text-gray-900 transition"
      >
        ← Volver
      </Link>

      <h1 className="text-2xl font-semibold mb-2">Explorar productos</h1>
      <FiltersBar value={filters} onChange={setFilters} />

      {/* Detalle inline (sin compatibilidades) */}
      {detail && (
        <section className="mb-6 border rounded-xl p-4">
          <div className="flex gap-6">
            <div className="w-40 shrink-0">
              {detail.product.image
                ? <img src={`/images/${detail.product.image}`} alt="" className="w-40 h-40 object-contain border rounded" />
                : <div className="w-40 h-40 grid place-items-center border rounded text-sm text-neutral-500">Sin imagen</div>}
              <p className="text-xs text-neutral-500 mt-2">{detail.product.sku ?? "—"}</p>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{detail.product.base_name}</h2>
              <p className="text-sm text-neutral-600">
                Marca: {detail.product.brand ?? "—"} · Categoría: {detail.product.category ?? "—"}
              </p>
              <div className="mt-2 text-sm">
                <p><b>Modelo:</b> {detail.product.model ?? "—"}</p>
                <p><b>Precio:</b>{" "}
                  {detail.product.price != null
                    ? `${Number(detail.product.price).toLocaleString("es-AR")} ${detail.product.currency ?? "ARS"}`
                    : "—"}
                </p>
              </div>
              {detail.product.description && (
                <div className="mt-3 text-sm">{detail.product.description}</div>
              )}
            </div>
            <button className="self-start text-sm text-red-700" onClick={() => setPid(null)}>↩ Volver</button>
          </div>
        </section>
      )}

      {/* Listado */}
      {rows.length === 0 ? (
        <p className="text-neutral-600">No hay resultados.</p>
      ) : (
        <div className="grid gap-3">
          {rows.map((r) => {
            const price = r.price != null
              ? `${Number(r.price).toLocaleString("es-AR")} ${r.currency ?? "ARS"}`
              : "—";
            return (
              <article key={r.id} className="border rounded-xl p-4 hover:shadow-sm transition">
                <div className="flex gap-4">
                  <div className="w-24">
                    {r.image
                      ? <img src={`/images/${r.image}`} alt="" className="w-24 h-24 object-contain border rounded" />
                      : <div className="w-24 h-24 grid place-items-center border rounded text-xs text-neutral-500">Sin imagen</div>}
                    <p className="text-[11px] text-neutral-500 mt-1">{r.sku ?? "—"}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{r.base_name}</h3>
                    <p className="text-sm text-neutral-600">Marca: {r.brand ?? "—"}</p>
                    <p className="mt-1 text-sm"><b>Precio:</b> {price}</p>
                    <p className="mt-1 text-sm"><b>Modelo:</b> {r.model ?? "—"}</p>
                    <p className="mt-1 text-sm"><b>Categoría:</b> {r.category ?? "—"}</p>
                  </div>
                </div>
                <div className="self-center ml-auto shrink-0 flex justify-start">
                  <button
                    className="rounded-lg bg-red-700 text-white text-sm px-4 py-2 hover:bg-red-800 whitespace-nowrap"
                    onClick={() => setPid(r.id)}
                  >
                    Ver detalle
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
