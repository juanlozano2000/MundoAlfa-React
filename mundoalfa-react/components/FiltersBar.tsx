"use client";
import { useEffect, useState } from "react";

type Opt = { id: number; name: string };

export default function FiltersBar({
  value,
  onChange,
}: {
  value: { model: string | null; category: string | null; q: string };
  onChange: (v: { model: string | null; category: string | null; q: string }) => void;
}) {
  const [models, setModels] = useState<Opt[]>([]);
  const [cats, setCats] = useState<Opt[]>([]);

  useEffect(() => { fetch("/api/models").then(r => r.json()).then(setModels); }, []);
  useEffect(() => {
    const url = value.model ? `/api/categories?model=${encodeURIComponent(value.model)}` : "/api/categories";
    fetch(url).then(r => r.json()).then(setCats);
  }, [value.model]);

  return (
    <div className="flex flex-wrap gap-2 items-center mb-4">
      <input
        className="border rounded px-3 py-2 w-64"
        placeholder="Buscar (nombre o marca)"
        value={value.q}
        onChange={(e) => onChange({ ...value, q: e.target.value })}
      />

      <select
        className="border rounded px-3 py-2"
        value={value.model ?? ""}
        onChange={(e) => onChange({ ...value, model: e.target.value || null, category: null })}
      >
        <option value="">(Todos los modelos)</option>
        {models.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
      </select>

      <select
        className="border rounded px-3 py-2"
        value={value.category ?? ""}
        onChange={(e) => onChange({ ...value, category: e.target.value || null })}
      >
        <option value="">(Todas las categorías)</option>
        {cats.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
      </select>

      {(value.model || value.category || value.q) && (
        <button
          className="text-sm text-neutral-600 underline"
          onClick={() => onChange({ model: null, category: null, q: "" })}
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
