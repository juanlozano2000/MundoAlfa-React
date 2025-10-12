import Link from "next/link";

const modelos = [
	{
		nombre: "Alfa Romeo Mito",
		slug: "Alfa+Romeo+Mito",
		imagen: "/images/mito.png",
	},
	{
		nombre: "Alfa Romeo Giulietta",
		slug: "Alfa+Romeo+Giulietta",
		imagen: "/images/Alfa Romeo Giulietta.jpg",
	},
	{
		nombre: "Alfa Romeo Stelvio",
		slug: "Alfa+Romeo+Stelvio",
		imagen: "/images/Alfa Romeo Stelvio.png",
	},
	{
		nombre: "Alfa Romeo Giulia",
		slug: "Alfa+Romeo+Giulia",
		imagen: "/images/Alfa Romeo Giulia.jpg",
	},
];

export default function Home() {
	return (
		<main className="mx-auto max-w-6xl px-4 py-10">
			<h1 className="text-3xl font-semibold text-center">MundoAlfa</h1>
			<p className="text-neutral-600 text-center">Repuestos de Alfa Romeo</p>

      <p className="text-neutral-600 mt-6">Seleccioná el modelo:</p>

			<div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
				{modelos.map((modelo) => (
					<Link
						key={modelo.nombre}
						href={`/explorar?model=${modelo.slug}`}
						className="flex flex-col items-center rounded-lg bg-white p-4 transition-shadow hover:shadow-lg"
					>
						<img
							src={modelo.imagen}
							alt={modelo.nombre}
							className="mb-4 h-40 w-full rounded object-cover"
						/>
						<h2 className="text-center text-lg font-semibold">
							{modelo.nombre}
						</h2>
					</Link>
				))}
			</div>

      <div className="mt-6 text-center">
				<Link
					href="/explorar"
					className="inline-block rounded-lg bg-red-700 text-white px-5 py-3 hover:bg-red-800"
				>
					Ver todos los productos
				</Link>
			</div>
		</main>
	);
}
