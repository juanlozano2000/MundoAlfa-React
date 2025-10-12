export default function Loading() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-4 h-9 w-36 bg-gray-200 rounded animate-pulse" />

      <section className="mb-6 border rounded-xl p-4 animate-pulse">
        <div className="flex gap-6">
          <div className="w-40 h-40 bg-gray-200 rounded" />
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-1/2" />
            <div className="h-4 bg-gray-200 rounded w-1/3" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </section>
    </main>
  );
}
