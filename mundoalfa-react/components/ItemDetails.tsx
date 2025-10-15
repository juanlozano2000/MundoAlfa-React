import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

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
  const hasPrice = product.price != null;
  const currency = product.currency ?? "ARS";
  const formattedPrice = hasPrice
    ? Number(product.price).toLocaleString("es-AR")
    : null;

  return (
    <Card className="mb-6">
      <CardHeader className="border-b">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <CardTitle className="text-xl md:text-2xl font-semibold">
            {product.base_name}
          </CardTitle>
          <div className="flex flex-wrap gap-2">
            {product.brand && <Badge variant="secondary">{product.brand}</Badge>}
            {product.category && (
              <Badge variant="outline">{product.category}</Badge>
            )}
          </div>
        </div>
        {product.description && (
          <CardDescription>{product.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
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
            <p className="text-xs text-neutral-500 mt-2 text-center md:text-left">
              {product.sku ?? "—"}
            </p>
          </div>

          {/* Resto de la información */}
          <div className="flex-1 mt-4 md:mt-0">
            {/* <div className="flex items-baseline gap-2">
              {hasPrice ? (
                <>
                  <span className="text-3xl md:text-4xl font-bold tracking-tight">
                    $ {formattedPrice}
                  </span>
                  <span className="text-sm text-muted-foreground font-medium">
                    {currency}
                  </span>
                </>
              ) : (
                <span className="text-xl text-muted-foreground">—</span>
              )}
            </div> */}

            <div className="mt-3 space-y-1.5">
              <p className="text-sm text-neutral-600">
                Marca: {product.brand ?? "—"}
              </p>
              <p className="text-sm text-neutral-600">
                Categoría: {product.category ?? "—"}
              </p>
              <p className="text-sm">
                <b>Modelo:</b> {product.model ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
