"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FiltersBar from "../../components/FiltersBar";

type Product = {
  id: number; base_name: string; brand: string | null; image: string | null;
  sku: string | null; min_price: number | null; max_price: number | null; variants: number;
};

export default function Explorar() {
  const sp = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    model: sp.get("model"),
    category: sp.get("category"),
    q: sp.get("q") || "",
  });
  const [rows, setRows] = useState<Product[]>([]);
  const [pid, setPid] = useState<number | null>(sp.get("pid") ? Number(sp.get("pid")) : null);
  const [detail, setDetail] = useState<any>(null);

  // querystring de filtros
  const qs = useMemo(() => {
    const p = new URLSearchParams();
    if (filters.model) p.set("model", filters.model);
    if (filters.category) p.set("category", filters.category);
    if (filters.q) p.set("q", filters.q);
    return p.toString();
  }, [filters]);

  // fetch de productos
  useEffect(() => {
    fetch(`/api/products?${qs}`).then(r => r.json()).then(setRows);
    // limpiar detalle al cambiar filtros
    setPid(null); setDetail(null);
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
      <h1 className="text-2xl font-semibold mb-2">Explorar productos</h1>
      <FiltersBar value={filters} onChange={setFilters} />

      {/* Detalle inline */}
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
              <p className="text-sm text-neutral-600">Marca: {detail.product.brand ?? "—"} · Categoría: {detail.product.category}</p>
              <div className="mt-3 text-sm">{detail.product.description ?? "—"}</div>
            </div>
            <button className="text-sm text-red-700" onClick={() => setPid(null)}>↩ Volver</button>
          </div>

          <h3 className="mt-4 mb-2 font-medium">Compatibilidades</h3>
          <div className="overflow-x-auto border rounded">
            <table className="min-w-full text-sm">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-3 py-2 text-left">Modelo</th>
                  <th className="px-3 py-2 text-left">Posición</th>
                  <th className="px-3 py-2 text-left">Motor</th>
                  <th className="px-3 py-2 text-left">Años</th>
                  <th className="px-3 py-2 text-left">Precio</th>
                  <th className="px-3 py-2 text-left">OEM</th>
                  <th className="px-3 py-2 text-left">Notas</th>
                </tr>
              </thead>
              <tbody>
                {detail.fitments.map((f: any, i: number) => (
                  <tr key={i} className="odd:bg-white even:bg-neutral-50/40">
                    <td className="px-3 py-2">{f.model}</td>
                    <td className="px-3 py-2">{f.position ?? "—"}</td>
                    <td className="px-3 py-2">{f.engine ?? "—"}</td>
                    <td className="px-3 py-2">{(f.year_from ?? "—") + "–" + (f.year_to ?? "—")}</td>
                    <td className="px-3 py-2">{f.price != null ? `${Number(f.price).toLocaleString("es-AR")} ${f.currency ?? ""}` : "—"}</td>
                    <td className="px-3 py-2">{f.oem_code ?? "—"}</td>
                    <td className="px-3 py-2">{f.notes ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Listado */}
      {rows.length === 0 ? (
        <p className="text-neutral-600">No hay resultados.</p>
      ) : (
        <div className="grid gap-3">
          {rows.map((r) => {
            const price =
              r.min_price == null ? "—"
              : r.min_price === r.max_price
                ? `${Number(r.min_price).toLocaleString("es-AR")} ARS`
                : `${Number(r.min_price).toLocaleString("es-AR")}–${Number(r.max_price).toLocaleString("es-AR")} ARS`;
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
                    <p className="mt-1 text-sm"><b>Precio ref.:</b> {price}</p>
                    <p className="text-xs text-neutral-500">Variantes compatibles: {r.variants}</p>
                  </div>
                  <div className="self-center">
                    <button
                      className="rounded-lg bg-red-700 text-white text-sm px-4 py-2 hover:bg-red-800"
                      onClick={() => setPid(r.id)}
                    >
                      Ver detalle
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
