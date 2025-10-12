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

export default function ItemDetails({ product }: { product: Product }) {
  const price =
    product.price != null
      ? `${Number(product.price).toLocaleString("es-AR")} ${product.currency ?? "ARS"}`
      : "—";

  return (
    <section className="mb-6 border rounded-xl p-4">
      <div className="flex gap-6">
        <div className="w-40 shrink-0">
          {product.image ? (
            <img
              src={`/images/${product.image}`}
              alt=""
              className="w-40 h-40 object-contain border rounded"
            />
          ) : (
            <div className="w-40 h-40 grid place-items-center border rounded text-sm text-neutral-500">
              Sin imagen
            </div>
          )}
          <p className="text-xs text-neutral-500 mt-2">{product.sku ?? "—"}</p>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold">{product.base_name}</h2>
          <p className="text-sm text-neutral-600">
            Marca: {product.brand ?? "—"} · Categoría: {product.category ?? "—"}
          </p>
          <div className="mt-2 text-sm">
            <p>
              <b>Modelo:</b> {product.model ?? "—"}
            </p>
            <p>
              <b>Precio:</b> {price}
            </p>
          </div>
          {product.description && (
            <div className="mt-3 text-sm">{product.description}</div>
          )}
        </div>
      </div>
    </section>
  );
}
