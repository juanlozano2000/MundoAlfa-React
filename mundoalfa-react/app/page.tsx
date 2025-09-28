import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-semibold">MundoAlfa</h1>
      <p className="text-neutral-600">Showroom consultivo de repuestos.</p>

      <div className="mt-6">
        <Link href="/explorar" className="inline-block rounded-lg bg-red-700 text-white px-5 py-3 hover:bg-red-800">
          Empezar a explorar
        </Link>
      </div>
    </main>
  );
}
