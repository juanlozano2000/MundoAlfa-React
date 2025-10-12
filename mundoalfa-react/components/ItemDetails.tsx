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
      {/* Título primero en mobile */}
      <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-2">{product.base_name}</h2>

      {/* En mobile: una columna (imagen luego detalles). En md+: 2 columnas */}
      <div className="md:flex md:items-start md:gap-6">
        {/* Foto + SKU */}
        <div className="w-full md:w-40 md:shrink-0">
          {product.image ? (
            <img
              src={`/images/${product.image}`}
              alt={product.base_name}
              className="w-full max-w-[14rem] h-52 md:max-w-[10rem] md:h-40 object-contain border rounded mx-auto"
            />
          ) : (
            <div className="w-full max-w-[14rem] h-52 md:max-w-[10rem] md:h-40 mx-auto grid place-items-center border rounded text-sm text-neutral-500">
              Sin imagen
            </div>
          )}
          <p className="text-xs text-neutral-500 mt-2 text-center md:text-left">{product.sku ?? "—"}</p>
        </div>

        {/* Resto de la información */}
        <div className="flex-1 mt-3 md:mt-0">
          <p className="text-sm text-neutral-600">
            Marca: {product.brand ?? "—"}
          </p>
          <p className="text-sm text-neutral-600">
            Categoría: {product.category ?? "—"}
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
