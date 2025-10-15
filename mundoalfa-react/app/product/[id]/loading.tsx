export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      {/* Botón/Link volver */}
      <div className="mb-4 h-9 w-44 bg-gray-200 rounded" />

      {/* Card Skeleton */}
      <section className="mb-6 border rounded-xl overflow-hidden">
        {/* Header: título + badges y descripción */}
        <div className="border-b p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="h-7 w-56 bg-gray-200 rounded" />
            <div className="flex flex-wrap gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded-full" />
              <div className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>
          </div>
          <div className="mt-2 h-4 w-3/4 bg-gray-200 rounded" />
        </div>

        {/* Content: izquierda imagen+SKU, derecha precio+detalles */}
        <div className="p-4 md:flex md:items-start md:gap-6">
          {/* Izquierda: imagen + sku */}
          <div className="w-full md:w-40 md:shrink-0">
            <div className="w-full max-w-[14rem] h-52 md:max-w-[10rem] md:h-40 bg-gray-200 rounded mx-auto" />
            <div className="h-3 w-24 bg-gray-200 rounded mt-2 mx-auto md:mx-0" />
          </div>

          {/* Derecha: precio y detalles */}
          <div className="flex-1 mt-4 md:mt-0">
            <div className="flex items-baseline gap-2">
              <div className="h-9 w-40 bg-gray-200 rounded" />
              <div className="h-4 w-10 bg-gray-200 rounded" />
            </div>
            

            <div className="mt-3 space-y-1.5">
              <div className="h-4 w-48 bg-gray-200 rounded" />
              <div className="h-4 w-56 bg-gray-200 rounded" />
              <div className="h-4 w-40 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
